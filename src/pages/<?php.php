// ============================================================
// ACF7 DB — Draft / Published Status
// ============================================================

// 1. Enqueue styles + scripts on the Advanced CF7 DB listing page
add_action( 'admin_enqueue_scripts', 'acf7db_draft_enqueue' );
function acf7db_draft_enqueue() {

    // Only run on Advanced CF7 DB listing page
    $page = $_GET['page'] ?? '';
    if ( strpos( $page, 'contact-form-listing' ) === false ) return;

    // ── Inline CSS ────────────────────────────────────────────
    wp_add_inline_style( 'wp-admin', '
        .acf7-status-draft    { background:#fff3cd; color:#856404; padding:2px 8px; border-radius:3px; font-size:11px; font-weight:600; display:inline-block; }
        .acf7-status-published{ background:#d4edda; color:#155724; padding:2px 8px; border-radius:3px; font-size:11px; font-weight:600; display:inline-block; }
        .acf7-draft-btn   { color:#856404 !important; border-color:#ffc107 !important; margin-left:3px !important; }
        .acf7-publish-btn { color:#155724 !important; border-color:#28a745 !important; margin-left:3px !important; }
        .acf7-row-actions { margin-top:4px; }
        #acf7-bulk-status { margin-left:6px; }
        .acf7-bulk-apply  { margin-left:4px; }
    ' );
}

// 2. Pass status data + JS to admin footer
add_action( 'admin_footer', 'acf7db_draft_footer_script' );
function acf7db_draft_footer_script() {

    $page = $_GET['page'] ?? '';
    if ( strpos( $page, 'contact-form-listing' ) === false ) return;

    // Get the current form ID (same logic the plugin uses)
    $form_id = intval( $_GET['id'] ?? 0 );
    if ( ! $form_id ) {
        $q = new WP_Query([
            'post_type'      => 'wpcf7_contact_form',
            'posts_per_page' => 1,
            'orderby'        => 'title',
            'order'          => 'ASC',
            'fields'         => 'ids',
        ]);
        $form_id = ! empty( $q->posts ) ? $q->posts[0] : 0;
    }

    if ( ! $form_id ) return;

    // Build hash → status map from saved meta
    $saved   = get_post_meta( $form_id, 'cf7-adb-status', false );
    $map     = [];
    foreach ( (array) $saved as $row ) {
        if ( isset( $row['hash'], $row['status'] ) ) {
            $map[ $row['hash'] ] = $row['status'];
        }
    }

    $ajax_url = admin_url( 'admin-ajax.php' );
    $nonce    = wp_create_nonce( 'acf7db_status_nonce' );
    $map_json = json_encode( $map );

    echo <<<HTML
<script>
jQuery(function($){

    var ajaxUrl   = "{$ajax_url}";
    var nonce     = "{$nonce}";
    var statusMap = {$map_json};

    // ── 1. Read status for each row from the map ─────────────
    $("#property-lead-table tbody tr").each(function(){
        var val  = $(this).find(".adb-chk").val() || "";
        var hash = val.substring(0, 32);
        var st   = statusMap[hash] || "published";
        $(this).attr("data-acf7-status", st);
    });

    // ── 2. Add Status column header ──────────────────────────
    $("#property-lead-table thead tr").append("<th>Status</th>");
    $("#property-lead-table tfoot tr").append("<th>Status</th>");

    // ── 3. Add Status badge + Draft/Publish buttons per row ──
    $("#property-lead-table tbody tr").each(function(){
        var st = $(this).attr("data-acf7-status") || "published";
        $(this).append(
            "<td>" +
                badge(st) +
                '<div class="acf7-row-actions">' +
                    '<button type="button" class="button button-small acf7-draft-btn acf7-row-action" data-action="draft">Draft</button>' +
                    '<button type="button" class="button button-small acf7-publish-btn acf7-row-action" data-action="published">Publish</button>' +
                "</div>" +
            "</td>"
        );
    });

    // ── 4. Add Bulk Status dropdown next to Delete button ────
    $("#adb-delete-button").after(
        ' <select id="acf7-bulk-status">' +
            '<option value="">— Bulk Status —</option>' +
            '<option value="draft">Mark as Draft</option>' +
            '<option value="published">Mark as Published</option>' +
        '</select>' +
        ' <button type="button" class="button acf7-bulk-apply">Apply</button>'
    );

    // ── 5. Row-level: click Draft or Publish ─────────────────
    $(document).on("click", ".acf7-row-action", function(){
        var \$btn    = $(this);
        var \$row    = \$btn.closest("tr");
        var \$chk    = \$row.find(".adb-chk");
        var newSt   = \$btn.data("action");
        var formId  = \$chk.data("id");
        var entryVal = \$chk.val() || "";

        \$btn.prop("disabled", true).text("Saving…");

        doUpdate( formId, [entryVal], newSt, function(){
            var hash = entryVal.substring(0, 32);
            statusMap[hash] = newSt;
            \$row.attr("data-acf7-status", newSt);
            \$row.find("td:last .acf7-status-draft, td:last .acf7-status-published")
                .replaceWith( badge(newSt) );
            \$btn.prop("disabled", false).text( newSt === "draft" ? "Draft" : "Publish" );
        });
    });

    // ── 6. Bulk apply ─────────────────────────────────────────
    $(".acf7-bulk-apply").on("click", function(){
        var newSt   = $("#acf7-bulk-status").val();
        if ( !newSt ) { alert("Please select a status first."); return; }

        var entries = [];
        var formId  = 0;
        $(".adb-chk:checked").each(function(){
            entries.push( $(this).val() );
            formId = $(this).data("id");
        });

        if ( !entries.length ) { alert("Please select at least 1 entry."); return; }

        doUpdate( formId, entries, newSt, function(){
            $(".adb-chk:checked").each(function(){
                var \$row    = $(this).closest("tr");
                var entryVal = $(this).val() || "";
                var hash    = entryVal.substring(0, 32);
                statusMap[hash] = newSt;
                \$row.attr("data-acf7-status", newSt);
                \$row.find("td:last .acf7-status-draft, td:last .acf7-status-published")
                    .replaceWith( badge(newSt) );
            });
        });
    });

    // ── Helpers ───────────────────────────────────────────────
    function badge(status){
        var cls   = (status === "draft") ? "acf7-status-draft" : "acf7-status-published";
        var label = (status === "draft") ? "Draft" : "Published";
        return '<span class="' + cls + '">' + label + '</span>';
    }

    function doUpdate( formId, entries, status, callback ){
        $.post( ajaxUrl, {
            action  : "acf7db_update_status",
            nonce   : nonce,
            form_id : formId,
            entries : entries,
            status  : status
        }, function(res){
            if ( res.success ) {
                callback();
            } else {
                alert("Error: " + (res.data || "Could not update status.") );
            }
        });
    }

});
</script>
HTML;
}

// 3. AJAX handler — save status to post meta
add_action( 'wp_ajax_acf7db_update_status', 'acf7db_update_status_handler' );
function acf7db_update_status_handler() {

    check_ajax_referer( 'acf7db_status_nonce', 'nonce' );

    if ( ! current_user_can( 'manage_options' ) ) {
        wp_send_json_error( 'Unauthorized' );
    }

    $form_id    = intval( $_POST['form_id'] ?? 0 );
    $entries    = array_map( 'sanitize_text_field', (array)( $_POST['entries'] ?? [] ) );
    $new_status = sanitize_text_field( $_POST['status'] ?? '' );

    if ( ! $form_id || empty( $entries ) ) {
        wp_send_json_error( 'Missing data' );
    }

    if ( ! in_array( $new_status, [ 'draft', 'published' ], true ) ) {
        wp_send_json_error( 'Invalid status' );
    }

    // Load existing map
    $saved = get_post_meta( $form_id, 'cf7-adb-status', false );
    $map   = [];
    foreach ( (array) $saved as $row ) {
        if ( isset( $row['hash'] ) ) {
            $map[ $row['hash'] ] = $row;
        }
    }

    // Update/insert each entry
    foreach ( $entries as $entry_val ) {
        $hash = substr( $entry_val, 0, 32 );
        $map[ $hash ] = [
            'hash'   => $hash,
            'status' => $new_status,
        ];
    }

    // Rewrite meta
    delete_post_meta( $form_id, 'cf7-adb-status' );
    foreach ( $map as $row ) {
        add_post_meta( $form_id, 'cf7-adb-status', $row );
    }

    wp_send_json_success( 'Updated' );
}

// ============================================================
// END ACF7 DB Draft Status
// ============================================================