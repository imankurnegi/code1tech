<?php
// Register Menu
function mytheme_register_menus() {
    register_nav_menus(array(
        'primary_menu' => __('Primary Menu', 'mytheme'),
        'secondary_menu' => __('Secondary Menu', 'mytheme'),
        'footer_code'  => __('Footer Code Menu', 'mytheme'),
//         'footer_hire'   => __('Footer Hire Menu', 'mytheme'),
    ));
}
add_action('after_setup_theme', 'mytheme_register_menus');

add_theme_support( 'post-thumbnails' );
add_post_type_support( 'page', 'thumbnail' );

/** Restriction For Frontend */

add_action('template_redirect', function () {

    // Admin + REST API always allow
    if (is_admin() || defined('REST_REQUEST')) {
        return;
    }

    // Current request URI
    $request_uri = $_SERVER['REQUEST_URI'];
    if (strpos($request_uri, '/frontend/') !== false) {
        return;
    }
    wp_die('Access Denied', '403 Forbidden', ['response' => 403]);

});

// Disable RSS feeds
function disable_feeds() {
    wp_die(__('No feed available.'));
}
add_action('do_feed', 'disable_feeds', 1);
add_action('do_feed_rdf', 'disable_feeds', 1);
add_action('do_feed_rss', 'disable_feeds', 1);
add_action('do_feed_rss2', 'disable_feeds', 1);
add_action('do_feed_atom', 'disable_feeds', 1);

// Header & Footer 
function qubewp_theme_customizer_settings( $wp_customize ) {

    /* =========================
       HEADER SETTINGS
    ========================== */

    // Header Section
    $wp_customize->add_section('qubewp_header_section', array(
        'title'    => __('Header Settings', 'qubewp'),
        'priority' => 30,
    ));

    // Header Logo
    $wp_customize->add_setting('header_logo', array(
        'default' => '',
        'sanitize_callback' => 'absint'
    ));

    $wp_customize->add_control(new WP_Customize_Media_Control(
        $wp_customize,
        'header_logo_control',
        array(
            'label'    => __('Header Logo', 'qubewp'),
            'section'  => 'qubewp_header_section',
            'settings' => 'header_logo',
            'mime_type'=> 'image',
        )
    ));

    // Header Button Text
    $wp_customize->add_setting('header_btn_text', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field'
    ));

    $wp_customize->add_control('header_btn_text', array(
        'label'   => __('Header Button Text', 'qubewp'),
        'section' => 'qubewp_header_section',
        'type'    => 'text',
    ));

    // Header Button URL
    $wp_customize->add_setting('header_btn_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control('header_btn_url', array(
        'label'   => __('Header Button URL', 'qubewp'),
        'section' => 'qubewp_header_section',
        'type'    => 'url',
    ));


    /* =========================
       FOOTER SETTINGS
    ========================== */

    // Footer Section
    $wp_customize->add_section('qubewp_footer_section', array(
        'title'    => __('Footer Settings', 'qubewp'),
        'priority' => 40,
    ));

    // Footer Logo
    $wp_customize->add_setting('footer_logo', array(
        'default' => '',
        'sanitize_callback' => 'absint'
    ));

    $wp_customize->add_control(new WP_Customize_Media_Control(
        $wp_customize,
        'footer_logo_control',
        array(
            'label'    => __('Footer Logo', 'qubewp'),
            'section'  => 'qubewp_footer_section',
            'settings' => 'footer_logo',
            'mime_type'=> 'image',
        )
    ));

    // Footer Text
    $wp_customize->add_setting('footer_text', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field'
    ));

    $wp_customize->add_control('footer_text', array(
        'label'   => __('Footer Text', 'qubewp'),
        'section' => 'qubewp_footer_section',
        'type'    => 'text',
    ));

    // Footer Copyright
    $wp_customize->add_setting('footer_copyright', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field'
    ));

    $wp_customize->add_control('footer_copyright', array(
        'label'   => __('Copyright Text', 'qubewp'),
        'section' => 'qubewp_footer_section',
        'type'    => 'text',
    ));

/* ===== Ambition Box ===== */
$wp_customize->add_setting('footer_ambition_box', array(
    'sanitize_callback' => 'esc_url_raw',
));

$wp_customize->add_control('footer_ambition_box', array(
    'label'   => __('Ambition Box URL', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'url',
));

/* ==== Facebook ===== */
$wp_customize->add_setting('footer_facebook', array(
    'sanitize_callback' => 'esc_url_raw',
));

$wp_customize->add_control('footer_facebook', array(
    'label'   => __('Facebook URL', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'url',
));


/* ===== LinkedIn ===== */
$wp_customize->add_setting('footer_linkedin', array(
    'sanitize_callback' => 'esc_url_raw',
));

$wp_customize->add_control('footer_linkedin', array(
    'label'   => __('LinkedIn URL', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'url',
));

/* ===== Instagram ===== */
$wp_customize->add_setting('footer_instagram', array(
    'sanitize_callback' => 'esc_url_raw',
));

$wp_customize->add_control('footer_instagram', array(
    'label'   => __('Instagram URL', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'url',
));

/* Twitter */
$wp_customize->add_setting('footer_twitter', array(
    'sanitize_callback' => 'esc_url_raw',
));

$wp_customize->add_control('footer_twitter', array(
    'label'   => __('Twitter URL', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'url',
));

/* Pintrest */
$wp_customize->add_setting('footer_pinterest', array(
    'sanitize_callback' => 'esc_url_raw',
));

$wp_customize->add_control('footer_pinterest', array(
    'label'   => __('Pinterest URL', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'url',
));



    /* ===== Privacy Policy ===== */
    $wp_customize->add_setting('footer_privacy_policy', array(
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('footer_privacy_policy', array(
        'label'   => __('Privacy Policy URL', 'qubewp'),
        'section' => 'qubewp_footer_section',
        'type'    => 'url',
    ));

    /* ===== Terms ===== */
    $wp_customize->add_setting('footer_terms', array(
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control('footer_terms', array(
        'label'   => __('Terms URL', 'qubewp'),
        'section' => 'qubewp_footer_section',
        'type'    => 'url',
    ));

        /* ===== Footer Email ===== */
    $wp_customize->add_setting('footer_email', array(
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('footer_email', array(
        'label'   => __('Footer Email ID', 'qubewp'),
        'section' => 'qubewp_footer_section',
        'type'    => 'email',
    ));

    /* ===== Footer Sales Email ===== */
$wp_customize->add_setting('sales_email', array(
    'sanitize_callback' => 'sanitize_email',
));

$wp_customize->add_control('sales_email', array(
    'label'   => __('Sales Email ID', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'email',
));

/* ===== Sales Number 1 ===== */
$wp_customize->add_setting('sales_number_1', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('sales_number_1', array(
    'label'   => __('Sales Contact Number 1', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));

/* ===== Sales Number 2 ===== */
$wp_customize->add_setting('sales_number_2', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('sales_number_2', array(
    'label'   => __('Sales Contact Number 2', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));

/* ===== Sales Number 3 ===== */
$wp_customize->add_setting('sales_number_3', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('sales_number_3', array(
    'label'   => __('Sales Contact Number 3', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));

/* ===== HR Number 1 ===== */
$wp_customize->add_setting('hr_number_1', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('hr_number_1', array(
    'label'   => __('HR Contact Number 1', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));

/* ===== HR Number 2 ===== */
$wp_customize->add_setting('hr_number_2', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('hr_number_2', array(
    'label'   => __('HR Contact Number 2', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));


/* ===== Footer Address Heading ===== */
$wp_customize->add_setting('footer_address_heading_1', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('footer_address_heading_1', array(
    'label'   => __('Footer Address Heading 1', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));


    /* ===== Footer Location / Address ===== */
    $wp_customize->add_setting('footer_location', array(
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('footer_location', array(
        'label'   => __('Footer Location / Address', 'qubewp'),
        'section' => 'qubewp_footer_section',
        'type'    => 'textarea',
    ));

/* ===== Footer Address Heading ===== */
$wp_customize->add_setting('footer_address_heading_2', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('footer_address_heading_2', array(
    'label'   => __('Footer Address Heading 2', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));    

/* ===== Footer Location / Address 2 ===== */
$wp_customize->add_setting('footer_location_2', array(
    'sanitize_callback' => 'sanitize_textarea_field',
));

$wp_customize->add_control('footer_location_2', array(
    'label'   => __('Footer Location / Address 2', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'textarea',
));


/* ===== Footer Address Heading ===== */
$wp_customize->add_setting('footer_address_heading_3', array(
    'sanitize_callback' => 'sanitize_text_field',
));

$wp_customize->add_control('footer_address_heading_3', array(
    'label'   => __('Footer Address Heading 3', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'text',
));

/* ===== Footer Location / Address 3 ===== */
$wp_customize->add_setting('footer_location_3', array(
    'sanitize_callback' => 'sanitize_textarea_field',
));

$wp_customize->add_control('footer_location_3', array(
    'label'   => __('Footer Location / Address 3', 'qubewp'),
    'section' => 'qubewp_footer_section',
    'type'    => 'textarea',
));


}
add_action('customize_register', 'qubewp_theme_customizer_settings');


// In wp-config.php (or a settings constant)
define('HEADLESS_FRONTEND_URL', 'https://www.code1.dev'); // your Next.js domain

/**
 * Build canonical URL for a post, mapped to the headless frontend.
 * Respects a custom canonical set in Yoast/Rank Math if present.
 */
function get_headless_canonical_url($post_id) {
    $base = trailingslashit(HEADLESS_FRONTEND_URL);

    // Custom canonical from Yoast/Rank Math, if set
    $canonical = get_post_meta($post_id, '_yoast_wpseo_canonical', true)
              ?: get_post_meta($post_id, 'rank_math_canonical_url', true);

    if (!empty($canonical)) {
        return esc_url_raw($canonical);
    }

    // Homepage → frontend root, not /home/
    if ((int) $post_id === (int) get_option('page_on_front')) {
        return esc_url_raw($base);
    }

    // Other pages: build from slug (includes parent slugs, e.g. about/team)
    $slug = get_page_uri($post_id) ?: get_post_field('post_name', $post_id);

    return esc_url_raw($base . trailingslashit($slug));
}


function clear_homepage_cache_on_update($post_id) {

    // Skip autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    // Skip revisions
    if (wp_is_post_revision($post_id)) return;

    delete_transient('homepage_api_cache');
    delete_transient('data_science_api_cache');
    delete_transient('ai_ml_solutions_api_cache');
    delete_transient('data_engineering_api_cache');
    delete_transient('engineer_as_a_service_api_cache');
    delete_transient('contactus_api_cache');
    delete_transient('about_api_cache');
    delete_transient('teams_api_cache');
    delete_transient('topmenu_api_cache');
    delete_transient('careers_api_cache');
    delete_transient('on_demand_engineers_api_cache');
    delete_transient('blog_api_cache');
    delete_transient('offshore_engineers_api_cache');
    delete_transient('tech_team_engineers_api_cache');
    delete_transient('managed_services_engineers_api_cache');
    delete_transient('data_ingestion_engineers_api_cache');
    delete_transient('data_warehouse_engineers_api_cache');
    delete_transient('data_advanced_engineers_api_cache');
    delete_transient('data_quality_engineers_api_cache');
    delete_transient('data_cloud_engineers_api_cache');
    delete_transient('data_dataops_engineers_api_cache');
    delete_transient('business_intelligence_engineers_api_cache');
    delete_transient('predictive_engineers_api_cache');
    delete_transient('big_data_engineers_api_cache');
    delete_transient('data_bricks_engineers_api_cache');
    delete_transient('snowflake_engineers_api_cache');
    delete_transient('aws_engineers_api_cache');
    delete_transient('power_bi_engineers_api_cache');
    delete_transient('tableau_engineers_api_cache');
    delete_transient('n8n_engineers_api_cache');
    delete_transient('oracle_engineers_api_cache');    
    delete_transient('microsoft_engineers_api_cache');    
    delete_transient('azure_engineers_api_cache');
    delete_transient('powerapps_engineers_api_cache');
    delete_transient('d365_engineers_api_cache');
    delete_transient('fintech_engineers_api_cache');
    delete_transient('banking_engineers_api_cache');    
    delete_transient('healthcare_engineers_api_cache');    
    delete_transient('retail_engineers_api_cache');    
    delete_transient('real_estate_engineers_api_cache');    
    delete_transient('travel_engineers_api_cache');    
    delete_transient('professional_engineers_api_cache');    
    delete_transient('insurtech_engineers_api_cache');    
    delete_transient('manufacturing_engineers_api_cache');    
    delete_transient('education_engineers_api_cache');   
    delete_transient('gcp_engineers_api_cache');
    delete_transient('modal_fine_engineers_api_cache');
    delete_transient('computer_engineers_api_cache');           
    delete_transient('natural_engineers_api_cache');           
    delete_transient('strategy_engineers_api_cache');           
    delete_transient('agents_engineers_api_cache');           
    delete_transient('mlops_engineers_api_cache');  
    delete_transient('case_studies_api_cache');  
             
    //delete_transient('posts_api_cache');
    //delete_transient('alljobs_api_cache');
}
add_action('save_post', 'clear_homepage_cache_on_update');

//For Sending Location in CF7 Emails
add_filter( 'wpcf7_mail_components', 'cf7_add_location_to_email', 10, 3 );

function cf7_add_location_to_email( $components, $contact_form, $mail ) {

    $ip = $_SERVER['REMOTE_ADDR'];

    $response = wp_remote_get("http://ip-api.com/json/".$ip);

    if (!is_wp_error($response)) {

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body);

        if ($data && $data->status == "success") {

            $location = $data->city . ", " . $data->regionName . ", " . $data->country;

            $components['body'] .= "\nUser Location: ".$location;
        }
    }

    return $components;
}

add_filter('wpcf7_posted_data', 'cf7_save_location_in_db');

function cf7_save_location_in_db($posted_data) {

    $ip = $_SERVER['REMOTE_ADDR'];

    $response = wp_remote_get("http://ip-api.com/json/".$ip);

    if (!is_wp_error($response)) {

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body);

        if ($data && $data->status == "success") {

            $posted_data['user_location'] = $data->city . ", " . $data->regionName . ", " . $data->country;
        }
    }

    return $posted_data;
}


function inject_global_seo_data($response, $post_id = null) {

    // Agar post ID available hai
    if($post_id) {
     $og_image = get_post_meta($post_id, '_yoast_wpseo_opengraph-image', true);

        if (empty($og_image)) {
            $thumbnail_id = get_post_thumbnail_id($post_id);
            if ($thumbnail_id) {
                $og_image = wp_get_attachment_url($thumbnail_id);
            } else {
                $og_image = '';
            }
        }
        // YOAST SEO DATA
        $response['seo'] = [
            'title'       => get_post_meta($post_id, '_yoast_wpseo_title', true),
            'description' => get_post_meta($post_id, '_yoast_wpseo_metadesc', true),
            'keyword'     => get_post_meta($post_id, '_yoast_wpseo_focuskw', true),
            'og_image'    => $og_image,
            'noindex'     => get_post_meta($post_id, '_yoast_wpseo_meta-robots-noindex', true),
            'nofollow'    => get_post_meta($post_id, '_yoast_wpseo_meta-robots-nofollow', true),
        ];
    }

    return $response;
}


/** Token Auth */

function qubewp_verify_token_from_header() {

    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

    if ( empty($auth) ) {
        return new WP_Error(
            'no_token',
            'Authorization token missing',
            ['status' => 401]
        );
    }

    if ( strpos($auth, 'Bearer ') !== 0 ) {
        return new WP_Error(
            'invalid_format',
            'Invalid authorization format',
            ['status' => 401]
        );
    }

    $token = trim(str_replace('Bearer ', '', $auth));

    if ( ! defined('CODETECH_API_TOKEN') || ! hash_equals(CODETECH_API_TOKEN, $token) ) {
        return new WP_Error(
            'invalid_token',
            'Invalid token',
            ['status' => 403]
        );
    }

    return true;
}

/** Making Auth Globally for all API's */


// add_filter('rest_authentication_errors', function ($result) {

//     // Agar pehle se error hai → return
//     if ( ! empty($result) ) {
//         return $result;
//     }

//     // Sirf apne custom namespace ke liye
//     if ( strpos($_SERVER['REQUEST_URI'], '/wp-json/v1/') === false ) {
//         return $result;
//     }

//     return qubewp_verify_token_from_header();
// });

/**
 * Add ACF fields for Post Object / Relationship fields
 */
add_filter('acf/format_value', function($value, $post_id, $field) {

    // check field empty
    if(!$value) return $value;

    // Check field type
    if(in_array($field['type'], ['post_object', 'relationship'])) {

        // Multiple posts
        if(is_array($value)) {
            foreach($value as &$post_obj) {

                // ACF fields
                $acf_fields = get_fields($post_obj->ID);
                if($acf_fields){
                    $post_obj->acf = $acf_fields;
                }

                // SDB custom fields
                $sdb_fields = sdb_get_fields($post_obj->ID);
                if($sdb_fields){
                    $post_obj->sdb = $sdb_fields;
                }
            }
        } 

        // Single post
        else {

            // ACF fields
            $acf_fields = get_fields($value->ID);
            if($acf_fields){
                $value->acf = $acf_fields;
            }

            // SDB custom fields
            $sdb_fields = sdb_get_fields($value->ID);
            if($sdb_fields){
                $value->sdb = $sdb_fields;
            }
        }
    }

       // TAXONOMY FIELD
    if($field['type'] === 'taxonomy') {

        if(is_array($value)) {
            foreach($value as &$term) {

                $acf_fields = get_fields('term_' . $term->term_id);
                if($acf_fields){
                    $term->acf = $acf_fields;
                }

                // $sdb_fields = sdb_get_fields('term_' . $term->term_id);
                // if($sdb_fields){
                //     $term->sdb = $sdb_fields;
                // }
            }
        } else {

            $acf_fields = get_fields('term_' . $value->term_id);
            if($acf_fields){
                $value->acf = $acf_fields;
            }

            // $sdb_fields = sdb_get_fields('term_' . $value->term_id);
            // if($sdb_fields){
            //     $value->sdb = $sdb_fields;
            // }
        }
    }


    return $value;

}, 20, 3);


/**Cors Preflight**/

// add_action('rest_api_init', function() {
//     remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
//     add_filter('rest_pre_serve_request', function($value) {
//         header('Access-Control-Allow-Origin: *');
//         header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
//         header('Access-Control-Allow-Headers: Authorization, Content-Type');
//         return $value;
//     });
// }, 15);

// =====================================
// REST API Register
// =====================================


function get_page_schema($page_id) {
    $title = get_the_title($page_id);
    $description = get_post_meta($page_id, '_yoast_wpseo_metadesc', true); // Or fallback to excerpt
    if (!$description) {
        $description = wp_strip_all_tags(get_post_field('post_content', $page_id));
        $description = mb_substr($description, 0, 160); // Limit to 160 chars
    }

    $logo = get_theme_mod('custom_logo');
    $logo_url = $logo ? wp_get_attachment_image_url($logo, 'full') : '';

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        'url'   => 'https://www.code1.dev/' . wp_make_link_relative(get_permalink($page_id)),
        'name' => $title,
        'description' => $description,
        'publisher' => [
            '@type' => 'Organization',
            'name' => get_bloginfo('name'),
            'logo' => [
                '@type' => 'ImageObject',
                'url' => $logo_url
            ]
        ],
        'mainEntityOfPage' => [
            '@type' => 'WebPage',
            '@id' => 'https://www.code1.dev/' . wp_make_link_relative(get_permalink($page_id))
        ]
    ];

    return $schema;
}

/**For Homepage */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/homepage', [
        'methods'  => 'GET',
        'callback' => 'homepage_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function homepage_sections_qubewp() {

    $cache_key = 'homepage_api_cache';

    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }

    $homepage_id = get_option('page_on_front');

    if (!$homepage_id) {
        return rest_ensure_response([
            'status' => false,
            'message' => 'Homepage not set'
        ]);
    }

    $response = get_fields($homepage_id);

    $response['technology_b_world_section'] = sdb_get_field('technologies_b_section','', $homepage_id);
    $response['work_with_us_section'] = sdb_get_field('work_with_us_section','', $homepage_id);
    $response['simple_transparent_hiring_section'] = sdb_get_field('transparent_hiring_section','', $homepage_id);  
    $response['why_businesses_section'] = sdb_get_field('why_businesses_section','', $homepage_id);

    $response = inject_global_seo_data($response, $homepage_id);
    $response['seo']['canonical'] = get_headless_canonical_url($homepage_id);
     // Add homepage JSON-LD schema
    $response['schema'] = get_page_schema($homepage_id);

    $final_response = [
        'status' => true,
        'data'   => $response
    ];

    // Cache for 1 hour
    set_transient($cache_key, $final_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_response);
}

/**For Menus */

add_action('wp_update_nav_menu_item', function ($menu_id, $menu_item_db_id) {

    if (
        isset($_POST['wp_menu_custom_fields_image_html'][$menu_item_db_id]) &&
        !empty($_POST['wp_menu_custom_fields_image_html'][$menu_item_db_id])
    ) {
        $image_html = $_POST['wp_menu_custom_fields_image_html'][$menu_item_db_id];

        if (preg_match('/src=["\']([^"\']+)["\']/', $image_html, $matches)) {

            update_post_meta(
                $menu_item_db_id,
                '_menu_item_icon',
                esc_url_raw($matches[1])
            );

        }
    }



}, 10, 2);

/* ===============================
   GET MENU ITEMS BY LOCATION
================================ */
function qubewp_get_menu_items($location) {

    $locations = get_nav_menu_locations();

    if (!isset($locations[$location])) {
        return [];
    }

    $menu_id = $locations[$location];
    $items   = wp_get_nav_menu_items($menu_id);

    $menu = [];

    if (!empty($items)) {
        foreach ($items as $item) {
            $menu[] = array(
                'id'     => $item->ID,
                'title'  => $item->title,
                'url'    => $item->url,
                // 'target' => $item->target,
            );
        }
    }

    return $menu;
}



// Custom REST API endpoint for WordPress menu
add_action('rest_api_init', function () {
    register_rest_route('v1/menus', '/topmenu', array(
        'methods' => 'GET',
        'callback' => 'get_top_menu_items',
        'permission_callback' => '__return_true',
    ));
});

function get_top_menu_items() {
    $cache_key = 'topmenu_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $locations = get_nav_menu_locations();
    $primary_menu_items = [];
    $secondary_menu_items = [];

    // PRIMARY MENU
    if (isset($locations['primary_menu'])) {
        $menu = wp_get_nav_menu_object($locations['primary_menu']);
        if ($menu) {
            $menu_items = wp_get_nav_menu_items($menu->term_id);

            // PURE backend hierarchy
            $primary_menu_items = build_menu_tree($menu_items);
        }
    }

    // SECONDARY MENU
    if (isset($locations['secondary_menu'])) {
        $menu = wp_get_nav_menu_object($locations['secondary_menu']);
        if ($menu) {
            $menu_items = wp_get_nav_menu_items($menu->term_id);
            $secondary_menu_items = build_menu_tree($menu_items);
        }
    }


    //Header Logo

        $logo_id = get_theme_mod('custom_logo');

    /**
     * Case 2: Agar theme ne apna custom header logo banaya ho
     * (commonly used in Header Settings)
     */
    if (!$logo_id) {
        $logo_id = get_theme_mod('header_logo');
    }

    if (!$logo_id) {
        return array(
            'status'  => false,
            'message' => 'Header logo not set in customizer',
        );
    }

    /* ===== Footer Logo ===== */
    $footer_logo_id = get_theme_mod('footer_logo');

    $footer_logo = array(
        'id'     => $footer_logo_id,
        'full'   => $footer_logo_id ? wp_get_attachment_url($footer_logo_id) : '',
        'medium' => $footer_logo_id ? wp_get_attachment_image_url($footer_logo_id, 'medium') : '',
        'alt'    => $footer_logo_id ? get_post_meta($footer_logo_id, '_wp_attachment_image_alt', true) : '',
    );

    $finalTopeMenu = [
        'status' => true,
        'data' => [
            'primary_menu' => $primary_menu_items,
            'secondary_menu' => $secondary_menu_items,
            'logo_id' => $logo_id,
            'full'    => wp_get_attachment_url($logo_id),
            'medium'  => wp_get_attachment_image_url($logo_id, 'medium'),
            'alt'     => get_post_meta($logo_id, '_wp_attachment_image_alt', true),
                        /* ===== Logo ===== */
            'footer_logo' => $footer_logo,
            /* ===== Text ===== */
            'footer_text'    => get_theme_mod('footer_text', ''),
            'copyright_text'=> get_theme_mod('footer_copyright', ''),

            /* ===== Footer Menus ===== */
            'footer_menus' => array(
                'code' => array(
                    'title' => 'Code1',
                    'items' => qubewp_get_menu_items('footer_code'),
                ),
                // 'hire' => array(
                //     'title' => 'Hire Talent',
                //     'items' => qubewp_get_menu_items('footer_hire'),
                // ),
            ),

            /* ===== Social ===== */
            'social_links' => array(
            'ambition_box' => get_theme_mod('footer_ambition_box', ''),  
            'facebook' => get_theme_mod('footer_facebook', ''),    
            'linkedin' => get_theme_mod('footer_linkedin', ''),
                'instagram'  => get_theme_mod('footer_instagram', ''),
                'twitter'   => get_theme_mod('footer_twitter', ''),
                'pinterest'   => get_theme_mod('footer_pinterest', ''),
            ),

            /* ===== Legal ===== */
            'legal_links' => array(
                'privacy_policy' => get_theme_mod('footer_privacy_policy', ''),
                'terms'          => get_theme_mod('footer_terms', ''),
            ),

            /* ===== Contact ===== */
            'contact' => array(
                'email'   => get_theme_mod('footer_email', ''),
                'sales_email'   => get_theme_mod('sales_email', ''),
                'sales_number_1'   => get_theme_mod('sales_number_1', ''),
                'sales_number_2'   => get_theme_mod('sales_number_2', ''),
                'sales_number_3'   => get_theme_mod('sales_number_3', ''),
                'hr_number_1'   => get_theme_mod('hr_number_1', ''),
                'hr_number_2'   => get_theme_mod('hr_number_2', ''),
                
                'address_heading_1' => get_theme_mod('footer_address_heading_1', ''),
                'address' => get_theme_mod('footer_location', ''),
                'address_heading_2' => get_theme_mod('footer_address_heading_2', ''),
                'address_2' => get_theme_mod('footer_location_2', ''),
                'address_heading_3' => get_theme_mod('footer_address_heading_3', ''),
                'address_3' => get_theme_mod('footer_location_3', ''),
            ),
        ]
    ];

      // Cache for 1 hour
    set_transient($cache_key, $finalTopeMenu, HOUR_IN_SECONDS);

    return rest_ensure_response($finalTopeMenu);
}

/**Get All Posts Categories */

add_action('rest_api_init', function () {
    register_rest_route('v1', '/categories', [
        'methods'  => 'GET',
        'callback' => 'custom_v1_get_categories',
        'permission_callback' => '__return_true'
    ]);
});

function custom_v1_get_categories($request) {

    $categories = get_categories([
        'taxonomy'   => 'category',
        'hide_empty' => true, // sirf categories jisme posts hain
    ]);

    $data = [];

    foreach ($categories as $category) {
        $data[] = [
            'id'          => $category->term_id,
            'name'        => $category->name,
            'slug'        => $category->slug,
            'description' => $category->description,
            'count'       => $category->count,
            'link'        => get_category_link($category->term_id),
        ];
    }

    return rest_ensure_response([
        'status' => true,
        'count'  => count($data),
        'data'   => $data,
    ]);
}


/** Blog Page */
add_action('rest_api_init', function () {
register_rest_route('v1', '/blog-page', [
    'methods'             => 'GET',
    'callback'            => 'custom_v1_get_blog_page',
    'permission_callback' => '__return_true',
]);
});


function custom_v1_get_blog_page() {
    $cache_key = 'blog_api_cache';
   // Try getting cached data
   $cached = get_transient($cache_key);
   if ($cached !== false) {
       return rest_ensure_response($cached);
   }
   $about_id=1076;
   $response = [];
   //echo "scsdc";
   //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
   $response = get_fields($about_id);
   $response = inject_global_seo_data($response, $about_id);
   $response['seo']['canonical'] = get_headless_canonical_url($about_id);
   $response['schema'] = get_page_schema($about_id);
   $response = decode_entities_deep($response);
   $final_about_response = [
       'status' => true,
       'data'   => $response
   ];
   // Cache the response for 1 hour
   set_transient($cache_key, $final_about_response, HOUR_IN_SECONDS);
   return rest_ensure_response($final_about_response);
}

/** Get All posts */

add_action('rest_api_init', function () {
    register_rest_route('v1', '/posts', [
        'methods'  => 'GET',
        'callback' => 'custom_v1_get_posts',
        'permission_callback' => '__return_true'
    ]);
});

function custom_v1_get_posts($request) {

    //    $cache_key = 'posts_api_cache';
        // Try getting cached data
     //   $cached = get_transient($cache_key);
        // if ($cached !== false) {
        //     return rest_ensure_response($cached);
        // }
        $limit = intval($request->get_param('limit')) ?: 10;
    
        // Support both single and multiple category parameters
        $cat_slug = $request->get_param('category');
    
        if (is_array($cat_slug)) {
            $cat_slug = array_map('sanitize_text_field', $cat_slug);
            $cat_slug = array_filter($cat_slug);
        } elseif (!empty($cat_slug)) {
            $cat_slug = [sanitize_text_field($cat_slug)];
        } else {
            $cat_slug = [];
        }
    
        $args = [
            'post_type'      => 'post',
            'posts_per_page' => $limit,
        ];
    
        if(!empty($request->get_param('slug')))
        {
            $args['post_status'] = ['publish', 'draft'];
        }
        else {
            $args['post_status'] = 'publish';
        }
    
        // Category slug filter
        if (!empty($cat_slug)) {
    
            $category_ids = [];
    
            foreach ($cat_slug as $slug) {
                $category = get_category_by_slug($slug);
    
                if ($category) {
                    $category_ids[] = $category->term_id;
                }
            }
    
            // If none of the supplied category slugs are valid → no posts
            if (empty($category_ids)) {
                return rest_ensure_response([
                    'status' => true,
                    'count'  => 0,
                    'data'   => []
                ]);
            }
    
            // Multiple categories = posts from any of these categories
            $args['category__in'] = $category_ids;
        }
    
        $query = new WP_Query($args);
        $posts = [];
    
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $seo_response = [];
                $seo_response = inject_global_seo_data($seo_response, get_the_ID());
                $seo_response['seo']['canonical'] = get_headless_canonical_url(get_the_ID());
                // Categories
                $categories = [];
                $post_categories = get_the_category();
        
                if (!empty($post_categories)) {
                    foreach ($post_categories as $category) {
                        $categories[] = [
                            'id'   => $category->term_id,
                            'name' => $category->name,
                            'slug' => $category->slug,
                        ];
                    }
                }
        
                // Author
                $author_id = get_the_author_meta('ID');
        
                $posts[] = [
                    'id'         => get_the_ID(),
                    'title'      => get_the_title(),
                    'slug'       => get_post_field('post_name'),
                    'content'    => wpautop(get_the_content()),
                    'date'       => get_the_date('Y-m-d'),
                    'link'       => get_permalink(),
                    'image'      => get_the_post_thumbnail_url(get_the_ID(), 'full'),
                    'seo'        => $seo_response['seo'],
                    'excerpt'    => get_the_excerpt(),
                    // Categories
                    'categories' => $categories,
        
                    // Author Details
                    'author' => [
                        'id'           => $author_id,
                        'name'         => get_the_author(),
                        'username'     => get_the_author_meta('user_login'),
                        'slug'         => get_the_author_meta('user_nicename'),
                        'email'        => get_the_author_meta('user_email'), // remove if exposing publicly
                        'avatar'       => get_avatar_url($author_id),
                        'description'  => get_the_author_meta('description'),
                        'profile_url' => wp_make_link_relative(get_author_posts_url($author_id)),
                    ],
                ];
            }
        
            wp_reset_postdata();
        }
    
        wp_reset_postdata();
        $posts = decode_entities_deep($posts);
        $posts_final_response = [
            'status' => true,
            'count'  => count($posts),
            'data'   => $posts
        ];
        // Cache for 1 hour
        // set_transient($cache_key, $posts_final_response, HOUR_IN_SECONDS);
        return rest_ensure_response($posts_final_response);
    }


// Recursive function to build menu tree with icons
function build_menu_tree($menu_items, $parent_id = 0) {
    $branch = [];

    foreach ($menu_items as $item) {
        if (intval($item->menu_item_parent) === intval($parent_id)) {

            // ICON FETCH
            $icon_url = '';
            $raw_meta = get_post_meta($item->ID, 'rt-wp-menu-custom-fields', true);
            if ($raw_meta) {
                $meta = maybe_unserialize($raw_meta);
                if (
                    isset($meta['selected-feature']) &&
                    $meta['selected-feature'] === 'image' &&
                    isset($meta['image']['media-link'])
                ) {
                    $icon_url = esc_url($meta['image']['media-link']);
                }
                if (!empty($meta['selected-feature'])
                ) {
                    $custom_text = $meta['custom-text'];
                }
            }

            // CHILDREN RECURSION
            $children = build_menu_tree($menu_items, $item->ID);

            $menu_item = [
                'id'       => $item->ID,
                'title'    => $item->title,
                'url'      => $item->url,
                'class'    => $item->classes[0],
                'subtitle' => $item->description,
                'icon'     => $icon_url,
                // Agar child nahi hai to empty array
                'children' => !empty($children) ? $children : []
            ];

            $branch[] = $menu_item;
        }
    }
    $branch = decode_entities_deep($branch);
    return $branch;
}


/**Contact Form 7 API endpoints code */

add_action('rest_api_init', function () {
    register_rest_route('v1', '/cf7/form-fields/(?P<form_id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'get_cf7_form_fields',
    ));
});

function get_cf7_form_fields($request) {

    $form_id = absint($request['form_id']);

    if (!class_exists('WPCF7_ContactForm')) {
        return new WP_Error('cf7_missing', 'Contact Form 7 not installed', ['status' => 404]);
    }

    $form = WPCF7_ContactForm::get_instance($form_id);
    if (!$form) {
        return new WP_Error('invalid_form', 'Invalid Form ID', ['status' => 404]);
    }

    $form_html = $form->prop('form'); // Full raw HTML
    $tags = $form->scan_form_tags();
    $response = [];
    $row = 1;

    // Parse <label for="fieldname">Label Text</label>
    $dom = new DOMDocument();
    @$dom->loadHTML('<?xml encoding="UTF-8">'.$form_html); // suppress warnings
    foreach ($dom->getElementsByTagName('h2') as $h2) {
        $response['heading'] = $h2->textContent;
    }
    foreach ($dom->getElementsByTagName('p') as $p) {
    if ($p->getAttribute('class') === 'paragraph') {
        $response['paragraph'] = $p->textContent;
    }
    }


    $labels = [];
    foreach ($dom->getElementsByTagName('label') as $label) {
        $for = $label->getAttribute('for');
        $labels[$for] = trim($label->textContent);
    }

    foreach ($tags as $tag) {
        if ($tag->type === 'submit') {
        $response['button_text'] = $tag->values[0] ?? '';
        }
        if (empty($tag->name)) continue;
        $field = [
            'field_name' => $tag->name,
            'type'       => $tag->basetype,
        ];
        // Label: use <label> if exists, else fallback to field name
        $field['label'] = isset($labels[$tag->name]) ? $labels[$tag->name] : $tag->name;

        // Placeholder: use first value for text/email/textarea fields
        if (!in_array($tag->basetype, ['checkbox','radio','select']) && !empty($tag->values[0])) {
            $field['placeholder'] = $tag->values[0];
        }

        // Options for checkbox/radio/select
        if (in_array($tag->basetype, ['checkbox','radio','select'])) {
            $field['options'] = array_values($tag->values);
        }

        $response['row'.$row][] = $field;
        $row++;
    }
    foreach ($dom->getElementsByTagName('p') as $p) {
    if ($p->getAttribute('class') === 'bottom-text') {
        $response['bottom_text'] = $p->textContent;
    }
    }

    return rest_ensure_response($response);
}

add_action('rest_api_init', function () {
    register_rest_route('v1', '/cf7/submit', array(
        'methods'  => 'POST',
        'callback' => 'handle_cf7_submission',
        'permission_callback' => '__return_true',
    ));
});

function handle_cf7_submission(WP_REST_Request $request) {

    // Get normal fields + files
    $data  = $request->get_params();
    $files = $request->get_file_params();

    if (empty($data) && empty($files)) {
        return rest_ensure_response([
            'status'  => false,
            'message' => 'No data received',
        ]);
    }

    // Sanitize text fields
    foreach ($data as $key => $value) {
        if (!is_array($value)) {
            $data[$key] = sanitize_text_field($value);
        }
    }

    // Form ID
    $form_id = !empty($data['form_id']) ? intval($data['form_id']) : 292;

    $contact_form = WPCF7_ContactForm::get_instance($form_id);

    if (!$contact_form) {
        return rest_ensure_response([
            'status'  => false,
            'message' => 'Invalid form ID'
        ]);
    }

    // Set global POST
    $_POST = $data;
    $_REQUEST = $data;

    // ✅ Attach FILES (VERY IMPORTANT)
    if (!empty($files)) {
        $_FILES = $files;
    }

    // Required CF7 hidden fields
    $_POST['_wpcf7'] = $form_id;
    $_POST['_wpcf7_version'] = defined('WPCF7_VERSION') ? WPCF7_VERSION : '5.0';
    $_POST['_wpcf7_locale'] = get_locale();
    $_POST['_wpcf7_unit_tag'] = 'wpcf7-f'.$form_id.'-p'.get_the_ID().'-o1';
    $_POST['_wpcf7_container_post'] = get_the_ID();

    // 🔥 Important: set submission instance
    WPCF7_Submission::get_instance();

    // Submit form
    $result = $contact_form->submit();

    return rest_ensure_response([
        'status'  => true,
        'data'    => $data,
        'files'   => array_keys($files), // debug ke liye
        'cf7_result' => $result
    ]);
}

// add_action('wpcf7_before_send_mail', 'cf7_send_data_to_api');

// function cf7_send_data_to_api($contact_form) {

//     $submission = WPCF7_Submission::get_instance();
//     if (!$submission) return;

//     $posted_data = $submission->get_posted_data();

//     $response = wp_remote_post(
//         rest_url('custom-cf7/v1/submit'),
//         array(
//             'headers' => array('Content-Type' => 'application/json'),
//             'body'    => json_encode($posted_data),
//             'timeout' => 20,
//         )
//     );
// }

//Services CPT Code
function register_services_cpt() {

    $labels = array(
        'name'               => 'Services',
        'singular_name'      => 'Service',
        'menu_name'          => 'Services',
        'add_new'            => 'Add New Service',
        'add_new_item'       => 'Add New Service',
        'edit_item'          => 'Edit Service',
        'new_item'           => 'New Service',
        'view_item'          => 'View Service',
        'search_items'       => 'Search Services',
        'not_found'          => 'No services found',
        'not_found_in_trash' => 'No services found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-hammer',
        'supports'      => array('title', 'editor', 'thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'services'),
        'show_in_rest'  => true, // Gutenberg + REST API
    );

    register_post_type('services', $args);
}
add_action('init', 'register_services_cpt');


function register_services_taxonomy() {

    $labels = array(
        'name'              => 'Service Categories',
        'singular_name'     => 'Service Category',
        'search_items'      => 'Search Categories',
        'all_items'         => 'All Categories',
        'edit_item'         => 'Edit Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'menu_name'         => 'Service Categories',
    );

    $args = array(
        'hierarchical'      => true, // category like
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'service-category'),
        'show_in_rest'      => true,
    );

    register_taxonomy('service_category', array('services'), $args);
}
add_action('init', 'register_services_taxonomy');


//Client Logos CPT Code
function register_clientlogos_cpt() {

    $labels = array(
        'name'               => 'Client Logos',
        'singular_name'      => 'clientlogos',
        'menu_name'          => 'Client Logos',
        'add_new'            => 'Add New Client Logo',
        'add_new_item'       => 'Add New Client Logo',
        'edit_item'          => 'Edit Client Logo',
        'new_item'           => 'New Client Logo',
        'view_item'          => 'View Client Logo',
        'search_items'       => 'Search Client Logo',
        'not_found'          => 'No Client Logo found',
        'not_found_in_trash' => 'No Client Logos found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-hammer',
        'supports'      => array('title', 'editor', 'thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'clientlogos'),
        'show_in_rest'  => true, // Gutenberg + REST API
    );

    register_post_type('clientlogos', $args);
}
add_action('init', 'register_clientlogos_cpt');



//Tools CPT Code
function register_tools_technologies_cpt() {

    $labels = array(
        'name'               => 'Tools & Technologies',
        'singular_name'      => 'Tool / Technology',
        'menu_name'          => 'Tools & Tech',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Tool / Technology',
        'edit_item'          => 'Edit Tool / Technology',
        'new_item'           => 'New Tool / Technology',
        'view_item'          => 'View Tool / Technology',
        'search_items'       => 'Search Tools & Technologies',
        'not_found'          => 'No items found',
        'not_found_in_trash' => 'No items found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-admin-tools',
        'supports'      => array('title', 'editor', 'thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'tools-technologies'),
        'show_in_rest'  => true, // Gutenberg + REST API support
    );

    register_post_type('tools_technologies', $args);
}
add_action('init', 'register_tools_technologies_cpt');

//Industries CPT Code
function register_industries_cpt() {

    $labels = array(
        'name'               => 'Industries',
        'singular_name'      => 'Industry',
        'menu_name'          => 'Industries',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Industry',
        'edit_item'          => 'Edit Industry',
        'new_item'           => 'New Industry',
        'view_item'          => 'View Industry',
        'search_items'       => 'Search Industries',
        'not_found'          => 'No industries found',
        'not_found_in_trash' => 'No industries found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-building',
        'supports'      => array('title', 'editor', 'thumbnail', 'excerpt'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'industries'),
        'show_in_rest'  => true, // Gutenberg + REST API
    );

    register_post_type('industries', $args);
}
add_action('init', 'register_industries_cpt');


//Case Studies CPT Code
function register_case_studies_cpt() {

    $labels = array(
        'name'               => 'Case Studies',
        'singular_name'      => 'Case Study',
        'menu_name'          => 'Case Studies',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Case Study',
        'edit_item'          => 'Edit Case Study',
        'new_item'           => 'New Case Study',
        'view_item'          => 'View Case Study',
        'search_items'       => 'Search Case Studies',
        'not_found'          => 'No case studies found',
        'not_found_in_trash' => 'No case studies found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-portfolio',
        'supports'      => array('title', 'editor', 'thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'case-studies'),
        'show_in_rest'  => true, // Gutenberg + REST API
    );

    register_post_type('case_studies', $args);
}
add_action('init', 'register_case_studies_cpt');

function register_case_study_category_taxonomy() {

    $labels = array(
        'name'              => 'Case Study Categories',
        'singular_name'     => 'Case Study Category',
        'search_items'      => 'Search Categories',
        'all_items'         => 'All Categories',
        'edit_item'         => 'Edit Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'menu_name'         => 'Categories',
    );

    $args = array(
        'hierarchical'      => true, // Category style
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'case-study-category'),
        'show_in_rest'      => true,
    );

    register_taxonomy('case_study_category', array('case_studies'), $args);
}
add_action('init', 'register_case_study_category_taxonomy');





function register_job_careers_cpt() {

    $labels = array(
        'name'               => 'Job Careers',
        'singular_name'      => 'Job Career',
        'menu_name'          => 'Job Careers',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Job Career',
        'edit_item'          => 'Edit Job Career',
        'new_item'           => 'New Job Career',
        'view_item'          => 'View Job Career',
        'search_items'       => 'Search Job Careers',
        'not_found'          => 'No job careers found',
        'not_found_in_trash' => 'No job careers found in Trash',
    );

    $args = array(
        'labels'          => $labels,
        'public'          => true,
        'menu_icon'       => 'dashicons-portfolio',
        'capability_type' => 'job_career', // String format best hai
        'map_meta_cap'    => true,         // Yeh meta caps ko map karega
        
        // Manual mapping (Zaroori hai buttons ke liye)
        'capabilities' => array(
            'edit_post'          => 'edit_job_career',
            'read_post'          => 'read_job_career',
            'delete_post'        => 'delete_job_career',
            'edit_posts'         => 'edit_job_careers',
            'edit_others_posts'  => 'edit_others_job_careers',
            'publish_posts'      => 'publish_job_careers',
            'read_private_posts' => 'read_private_job_careers',
            'delete_posts'       => 'delete_job_careers',
        ),

        'supports'      => array('title', 'editor', 'thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'job-careers'),
        'show_in_rest'  => true,
    );

    register_post_type('job_careers', $args);
}
add_action('init', 'register_job_careers_cpt');

function register_job_career_category_taxonomy() {

    $labels = array(
        'name'              => 'Job Career Categories',
        'singular_name'     => 'Job Career Category',
        'search_items'      => 'Search Categories',
        'all_items'         => 'All Categories',
        'edit_item'         => 'Edit Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'menu_name'         => 'Categories',
    );

    $args = array(
        'hierarchical'      => true, // Category style
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'job-career-category'),
        'show_in_rest'      => true,
    );

    register_taxonomy('job_career_category', array('job_careers'), $args);
}
add_action('init', 'register_job_career_category_taxonomy');


function register_job_career_department_taxonomy() {

    $labels = array(
        'name'              => 'Job Career Departments',
        'singular_name'     => 'Job Career Department',
        'search_items'      => 'Search Departments',
        'all_items'         => 'All Departments',
        'edit_item'         => 'Edit Department',
        'update_item'       => 'Update Department',
        'add_new_item'      => 'Add New Department',
        'new_item_name'     => 'New Department Name',
        'menu_name'         => 'Departments',
    );

    $args = array(
        'hierarchical'      => true, // Category style
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'job-career-department'),
        'show_in_rest'      => true,
    );

    register_taxonomy('job_career_department', array('job_careers'), $args);
}
add_action('init', 'register_job_career_department_taxonomy');


function register_job_career_hire_type_taxonomy() {

    $labels = array(
        'name'              => 'Job Career Hire Types',
        'singular_name'     => 'Job Career Hire Type',
        'search_items'      => 'Search Hire Types',
        'all_items'         => 'All Hire Types',
        'edit_item'         => 'Edit Hire Type',
        'update_item'       => 'Update Hire Type',
        'add_new_item'      => 'Add New Hire Type',
        'new_item_name'     => 'New Hire Type Name',
        'menu_name'         => 'Hire Types',
    );

    $args = array(
        'hierarchical'      => true, // Category style
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'job-career-hire-type'),
        'show_in_rest'      => true,
    );

    register_taxonomy('job_career_hire_type', array('job_careers'), $args);
}
add_action('init', 'register_job_career_hire_type_taxonomy');


function register_job_career_city_taxonomy() {

    $labels = array(
        'name'              => 'Job Career Cities',
        'singular_name'     => 'Job Career City',
        'search_items'      => 'Search Cities',
        'all_items'         => 'All Cities',
        'edit_item'         => 'Edit City',
        'update_item'       => 'Update City',
        'add_new_item'      => 'Add New City',
        'new_item_name'     => 'New City Name',
        'menu_name'         => 'Cities',
    );

    $args = array(
        'hierarchical'      => true, // Category style
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'job-career-city'),
        'show_in_rest'      => true,
    );

    register_taxonomy('job_career_city', array('job_careers'), $args);
}
add_action('init', 'register_job_career_city_taxonomy');


function register_job_career_country_taxonomy() {

    $labels = array(
        'name'              => 'Job Career Countries',
        'singular_name'     => 'Job Career Country',
        'search_items'      => 'Search Countries',
        'all_items'         => 'All Countries',
        'edit_item'         => 'Edit Country',
        'update_item'       => 'Update Country',
        'add_new_item'      => 'Add New Country',
        'new_item_name'     => 'New Country Name',
        'menu_name'         => 'Countries',
    );

    $args = array(
        'hierarchical'      => true, // Category style
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'job-career-country'),
        'show_in_rest'      => true,
    );

    register_taxonomy('job_career_country', array('job_careers'), $args);
}
add_action('init', 'register_job_career_country_taxonomy');




// Service Category APi
add_action('rest_api_init', function () {

    register_rest_route('services/v1', '/categories', array(
        'methods'  => 'GET',
        'callback' => 'get_all_service_categories',
        'permission_callback' => '__return_true',
    ));

});

function get_all_service_categories() {

    $terms = get_terms(array(
        'taxonomy'   => 'service_category',
        'hide_empty' => false,
    ));

    if (is_wp_error($terms) || empty($terms)) {
        return array(
            'status'  => false,
            'message' => 'No service categories found',
        );
    }

    $data = array();

    foreach ($terms as $term) {

        $data[] = array(
            'id'          => $term->term_id,
            'name'        => $term->name,
            'slug'        => $term->slug,
            'description' => $term->description,
            'count'       => $term->count,
        );
    }

    return array(
        'status' => true,
        'count'  => count($data),
        'data'   => $data,
    );
}

//Service Category Post API
add_action('rest_api_init', function () {

    register_rest_route('services/v1', '/by-category', array(
        'methods'  => 'GET',
        'callback' => 'get_services_by_category_slug',
        'permission_callback' => '__return_true',
    ));

});

function get_services_by_category_slug($request) {

    $category_slug = $request->get_param('slug');

    if (empty($category_slug)) {
        return array(
            'status'  => false,
            'message' => 'Category slug is required',
        );
    }

    // Check category exists
    $term = get_term_by('slug', $category_slug, 'service_category');

    if (!$term) {
        return array(
            'status'  => false,
            'message' => 'Invalid service category',
        );
    }

    $args = array(
        'post_type'      => 'services',
        'posts_per_page' => -1,
        'tax_query'      => array(
            array(
                'taxonomy' => 'service_category',
                'field'    => 'slug',
                'terms'    => $category_slug,
            ),
        ),
    );

    $query = new WP_Query($args);

    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            $posts[] = array(
                'id'       => get_the_ID(),
                'title'    => get_the_title(),
                'slug'     => get_post_field('post_name', get_the_ID()),
                'content'  => get_the_content(),
                'excerpt'  => get_the_excerpt(),
                'image'    => get_the_post_thumbnail_url(get_the_ID(), 'full'),
                'permalink'=> get_permalink(),
            );
        }
        wp_reset_postdata();
    }

    return array(
        'status'   => true,
        'category' => array(
            'id'   => $term->term_id,
            'name' => $term->name,
            'slug' => $term->slug,
        ),
        'count' => count($posts),
        'data'  => $posts,
    );
}


/* ===============================
   FOOTER DATA
================================ */
function qubewp_get_footer_settings() {


    return array(
        'status' => true,
        'data'   => array(


        ),
    );
}


//Testimonial CPT Code
function register_testimonials_cpt() {

    $labels = array(
        'name'               => 'Testimonials',
        'singular_name'      => 'Testimonial',
        'menu_name'          => 'Testimonials',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Testimonial',
        'edit_item'          => 'Edit Testimonial',
        'new_item'           => 'New Testimonial',
        'view_item'          => 'View Testimonial',
        'search_items'       => 'Search Testimonials',
        'not_found'          => 'No testimonials found',
        'not_found_in_trash' => 'No testimonials found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-testimonial',
        'supports'      => array(
            'title',
            'editor',
            'thumbnail',
            'excerpt'
        ),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'testimonials'),
        'show_in_rest'  => true, // Gutenberg + REST API
    );

    register_post_type('testimonials', $args);
}
add_action('init', 'register_testimonials_cpt');

function register_testimonials_taxonomy() {

    $labels = array(
        'name'              => 'Testimonial Categories',
        'singular_name'     => 'Testimonial Category',
        'search_items'      => 'Search Categories',
        'all_items'         => 'All Categories',
        'edit_item'         => 'Edit Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'menu_name'         => 'Categories',
    );

    $args = array(
        'hierarchical'      => true, // category type
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array(
            'slug' => 'testimonial-category'
        ),
    );

    register_taxonomy('testimonial_category', array('testimonials'), $args);
}
add_action('init', 'register_testimonials_taxonomy');

// Our Capabilities
function qubewp_register_our_capabilities_cpt() {

    $labels = array(
        'name'                  => __('Our Capabilities', 'qubewp'),
        'singular_name'         => __('Capability', 'qubewp'),
        'menu_name'             => __('Our Capabilities', 'qubewp'),
        'name_admin_bar'        => __('Capability', 'qubewp'),
        'add_new'               => __('Add New', 'qubewp'),
        'add_new_item'          => __('Add New Capability', 'qubewp'),
        'new_item'              => __('New Capability', 'qubewp'),
        'edit_item'             => __('Edit Capability', 'qubewp'),
        'view_item'             => __('View Capability', 'qubewp'),
        'all_items'             => __('All Capabilities', 'qubewp'),
        'search_items'          => __('Search Capabilities', 'qubewp'),
        'not_found'             => __('No capabilities found', 'qubewp'),
        'not_found_in_trash'    => __('No capabilities found in Trash', 'qubewp'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-awards',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'has_archive'        => true,
        'rewrite'            => array('slug' => 'our-capabilities'),
        'show_in_rest'       => true, // Gutenberg + REST API
    );

    register_post_type('our_capabilities', $args);
}
add_action('init', 'qubewp_register_our_capabilities_cpt');


// Data Engineering Capabilities
function qubewp_register_data_engineering_capabilities_cpt() {

    $labels = array(
        'name'               => 'Data Engineering Capabilities',
        'singular_name'      => 'Data Engineering Capability',
        'menu_name'          => 'Data Engineering Capabilities',
        'menu_position'      => 21,
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Capability',
        'edit_item'          => 'Edit Capability',
        'new_item'           => 'New Capability',
        'view_item'          => 'View Capability',
        'all_items'          => 'All Capabilities',
        'search_items'       => 'Search Capabilities',
        'not_found'          => 'No capabilities found',
        'not_found_in_trash' => 'No capabilities found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-editor-table',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'data-engineering-capabilities'),
        'show_in_rest'  => true,
    );

    register_post_type('data_capabilities', $args);
}
add_action('init', 'qubewp_register_data_engineering_capabilities_cpt');


// Data Engineering Industries
function qubewp_register_data_engineering_industries_cpt() {

    $labels = array(
        'name'               => 'Data Engineering Industries',
        'singular_name'      => 'Data Engineering Industries',
        'menu_name'          => 'Data Engineering Industries',
        'menu_position'      => 22,
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Industries',
        'edit_item'          => 'Edit Industries',
        'new_item'           => 'New Industries',
        'view_item'          => 'View Industries',
        'all_items'          => 'All Industries',
        'search_items'       => 'Search Industries',
        'not_found'          => 'No Industries found',
        'not_found_in_trash' => 'No Industries found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-editor-table',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'data-engineering-industries'),
        'show_in_rest'  => true,
    );

    register_post_type('data_industries', $args);
}
add_action('init', 'qubewp_register_data_engineering_industries_cpt');


// Data Science Industries
function qubewp_register_data_science_industries_cpt() {

    $labels = array(
        'name'               => 'Data Science Industries',
        'singular_name'      => 'Data Science Industries',
        'menu_name'          => 'Data Science Industries',
        'menu_position'      => 23,
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Industries',
        'edit_item'          => 'Edit Industries',
        'new_item'           => 'New Industries',
        'view_item'          => 'View Industries',
        'all_items'          => 'All Industries',
        'search_items'       => 'Search Industries',
        'not_found'          => 'No Industries found',
        'not_found_in_trash' => 'No Industries found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-editor-table',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'data-science-industries'),
        'show_in_rest'  => true,
    );

    register_post_type('science_industries', $args);
}
add_action('init', 'qubewp_register_data_science_industries_cpt');

// AI Industries CPT Code
function qubewp_register_ai_industries_cpt() {

    $labels = array(
        'name'               => 'AI Industries',
        'singular_name'      => 'AI Industry',
        'menu_name'          => 'AI Industries',
        'menu_position'      => 24,
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Industry',
        'edit_item'          => 'Edit Industry',
        'new_item'           => 'New Industry',
        'view_item'          => 'View Industry',
        'all_items'          => 'All Industries',
        'search_items'       => 'Search Industries',
        'not_found'          => 'No Industries found',
        'not_found_in_trash' => 'No Industries found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-editor-table',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'ai-industries'),
        'show_in_rest'  => true,
    );

    register_post_type('ai_industries', $args);
}
add_action('init', 'qubewp_register_ai_industries_cpt');

//AI Stack CPT Code
function qubewp_register_ai_technology_stack() {

    /* -----------------------------
       Custom Post Type
    ------------------------------*/
    $labels = array(
        'name'               => 'AI Technology Stack',
        'singular_name'      => 'AI Technology',
        'menu_name'          => 'AI Technology Stack',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Technology',
        'edit_item'          => 'Edit Technology',
        'new_item'           => 'New Technology',
        'view_item'          => 'View Technology',
        'all_items'          => 'All Technology Stack',
        'search_items'       => 'Search Technology',
        'not_found'          => 'No Technology found',
        'not_found_in_trash' => 'No Technology found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-networking',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'ai-technology-stack'),
        'show_in_rest'  => true,
    );

    register_post_type('ai_technology_stack', $args);	


    /* -----------------------------
       Taxonomy
    ------------------------------*/
    $tax_labels = array(
        'name'              => 'Technology Categories',
        'singular_name'     => 'Technology Category',
        'search_items'      => 'Search Categories',
        'all_items'         => 'All Categories',
        'edit_item'         => 'Edit Category',
        'update_item'       => 'Update Category',
        'add_new_item'      => 'Add New Category',
        'new_item_name'     => 'New Category Name',
        'menu_name'         => 'Technology Categories',
    );

    $tax_args = array(
        'hierarchical'      => true,
        'labels'            => $tax_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'ai-tech-category'),
        'show_in_rest'      => true,
    );

    register_taxonomy(
        'ai_tech_category',
        array('ai_technology_stack'),
        $tax_args
    );

}

add_action('init', 'qubewp_register_ai_technology_stack');

//Engineer Services CPT Code
function qubewp_register_engineer_services_cpt() {

    $labels = array(
        'name'               => 'Engineer Services',
        'singular_name'      => 'Engineer Service',
        'menu_name'          => 'Engineer Services',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Service',
        'edit_item'          => 'Edit Service',
        'new_item'           => 'New Service',
        'view_item'          => 'View Service',
        'all_items'          => 'All Services',
        'search_items'       => 'Search Services',
        'not_found'          => 'No Services found',
        'not_found_in_trash' => 'No Services found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-admin-tools',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'engineer-services'),
        'show_in_rest'  => true,
    );

    register_post_type('engineer_services', $args);
}

add_action('init', 'qubewp_register_engineer_services_cpt');



//Data Science Business
function qubewp_register_data_science_business_cpt() {

    $labels = array(
        'name'               => 'Data Science Business',
        'singular_name'      => 'Data Science Business',
        'menu_name'          => 'Data Science Business',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Science Business',
        'edit_item'          => 'Edit Science Business',
        'new_item'           => 'New Science Business',
        'view_item'          => 'View Science Business',
        'all_items'          => 'All Science Business',
        'search_items'       => 'Search Science Business',
        'not_found'          => 'No Science Business found',
        'not_found_in_trash' => 'No Science Business found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-admin-tools',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'data-science-business'),
        'show_in_rest'  => true,
    );

    register_post_type('ds_business', $args);
}

add_action('init', 'qubewp_register_data_science_business_cpt');

//Smart Technology Homepage
function qubewp_register_smart_technology_cpt() {

    $labels = array(
        'name'               => 'Smart Technology Homepage',
        'singular_name'      => 'Smart Technology Homepage',
        'menu_name'          => 'Smart Technology Homepage',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Smart Technology',
        'edit_item'          => 'Edit Smart Technology',
        'new_item'           => 'New Smart Technology',
        'view_item'          => 'View Smart Technology',
        'all_items'          => 'All Smart Technology',
        'search_items'       => 'Search Smart Technology',
        'not_found'          => 'No Smart Technology found',
        'not_found_in_trash' => 'No Smart Technology found in Trash',
    );

    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_icon'     => 'dashicons-editor-table',
        'supports'      => array('title','editor','thumbnail'),
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'smart-technology'),
        'show_in_rest'  => true,
    );

    register_post_type('smart_technology', $args);
}

add_action('init', 'qubewp_register_smart_technology_cpt');

//FAQ's CPT Code
function create_faq_post_type() {

    $labels = array(
        'name'               => 'FAQs',
        'singular_name'      => 'FAQ',
        'menu_name'          => 'FAQs',
        'name_admin_bar'     => 'FAQ',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New FAQ',
        'new_item'           => 'New FAQ',
        'edit_item'          => 'Edit FAQ',
        'view_item'          => 'View FAQ',
        'all_items'          => 'All FAQs',
        'search_items'       => 'Search FAQs',
        'not_found'          => 'No FAQs found',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'menu_icon'          => 'dashicons-editor-help',
        'supports'           => array('title','editor'),
        'has_archive'        => true,
        'rewrite'            => array('slug' => 'faq'),
        'show_in_rest'       => true,
    );

    register_post_type('faq', $args);
}

add_action('init', 'create_faq_post_type');



// Universal recursive decoder — handles strings, arrays, objects at any depth
function decode_entities_deep($data) {
    if (is_string($data)) {
        return html_entity_decode($data, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = decode_entities_deep($value);
        }
        return $data;
    }

    if (is_object($data)) {
        foreach ($data as $key => $value) {
            $data->$key = decode_entities_deep($value);
        }
        return $data;
    }

    // int, bool, null — return as-is
    return $data;
}

//Tesitmonials API
// add_action('rest_api_init', function () {

//     register_rest_route('theme/v1', '/testimonials', array(
//         'methods'  => 'GET',
//         'callback' => 'theme_get_testimonials_api',
//         'permission_callback' => '__return_true',
//     ));

// });

// function theme_get_testimonials_api() {

//     if ( ! function_exists('get_field') ) {
//         return array(
//             'status'  => false,
//             'message' => 'ACF not active'
//         );
//     }

//     $args = array(
//         'post_type'      => 'testimonials',
//         'post_status'    => 'publish',
//         'posts_per_page' => -1,
//         'orderby'        => 'menu_order',
//         'order'          => 'ASC',
//     );

//     $query = new WP_Query($args);
//     $items = array();

//     if ( $query->have_posts() ) {

//         while ( $query->have_posts() ) {
//             $query->the_post();

//             $post_id  = get_the_ID();
//             $post_obj = get_post($post_id);

//             $items[] = array(
//                 'id'    => $post_id,

//                 // Default WP Fields
//                 'title'   => get_the_title($post_id) ?: '',
//                 'slug'    => $post_obj->post_name ?? '',
//                 'content' => apply_filters(
//                     'the_content',
//                     $post_obj->post_content ?? ''
//                 ),

//                 // // Featured Image
//                 // 'image' => get_the_post_thumbnail_url($post_id, 'full') ?: '',

//                 // ACF Fields (Testimonials CPT)
//                 'designation' => get_field('designation', $post_id) ?: '',
//                 'company'     => get_field('company', $post_id) ?: '',
//             );
//         }

//         wp_reset_postdata();
//     }

//     return array(
//         'status' => true,
//         'count'  => count($items),
//         'data'   => $items
//     );
// }




//Client Logos API
add_action('rest_api_init', function () {

    register_rest_route('v1', '/clientlogos', array(
        'methods'  => 'GET',
        'callback' => 'theme_get_clientlogos_api',
        'permission_callback' => '__return_true',
    ));

});

function theme_get_clientlogos_api() {

    if ( ! function_exists('get_field') ) {
        return array(
            'status'  => false,
            'message' => 'ACF not active'
        );
    }

    $args = array(
        'post_type'      => 'clientlogos',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'ID',
        'order'          => 'DESC',
    );

    $query = new WP_Query($args);
    $items = array();

    if ( $query->have_posts() ) {

        while ( $query->have_posts() ) {
            $query->the_post();

            $post_id  = get_the_ID();
            $post_obj = get_post($post_id);

            $items[] = array(
                // Default WP Fields
                'id'    => $post_id,
                'title'   => get_the_title($post_id) ?: '',
                'url'    => get_field('url', $post_id) ?: '',
                'image' => get_the_post_thumbnail_url($post_id, 'full') ?: '',
            );
        }

        wp_reset_postdata();
    }

    return array(
        'status' => true,
        'data'   => $items
    );
}



/**For Contact Us */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/contactus', [
        'methods'  => 'GET',
        'callback' => 'contact_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function contact_sections_qubewp() {
     $cache_key = 'contactus_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $contactpage_id=456;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($contactpage_id);
    $response['page_title'] = get_the_title($contactpage_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $contactpage_id)
    );
    $response['banner_image'] = get_the_post_thumbnail_url($contactpage_id, 'full') ?: '';
    $response['contact_help_section']=sdb_get_field('contact_us_page_8','', $contactpage_id);
    $response = inject_global_seo_data($response, $contactpage_id);
    $response['seo']['canonical'] = get_headless_canonical_url($contactpage_id);
    $response['schema'] = get_page_schema($contactpage_id);
    $response = decode_entities_deep($response); 
    $final_contactus_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 12 hours 
    set_transient($cache_key, $final_contactus_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_contactus_response);
}


/**For About */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/about', [
        'methods'  => 'GET',
        'callback' => 'about_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function about_sections_qubewp() {
     $cache_key = 'about_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $about_id=517;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($about_id);
    $response['page_title'] = get_the_title($about_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $about_id)
    );
    $response['banner_image'] = get_the_post_thumbnail_url($about_id, 'full') ?: '';
    $response['our_values_section']=sdb_get_field('our_values','', $about_id);
    $response['our_work_approach_section']=sdb_get_field('our_work_approach','', $about_id);
    $response['certifications_section']=sdb_get_field('certifications','', $about_id);
    $response = inject_global_seo_data($response, $about_id);
    $response['seo']['canonical'] = get_headless_canonical_url($about_id);
    $response['schema'] = get_page_schema($about_id);
    $response = decode_entities_deep($response); 
    $final_about_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_about_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_about_response);
}



/**For Teams */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/teams', [
        'methods'  => 'GET',
        'callback' => 'team_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function team_sections_qubewp() {
    $cache_key = 'teams_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $team_id=574;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response['page_title'] = get_the_title($team_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $team_id)
    );
    $response['banner_image'] = get_the_post_thumbnail_url($team_id, 'full') ?: '';
    $response['leadership_team_section']=sdb_get_field('leadership_team_section','', $team_id);
    $response['our_architects_section']=sdb_get_field('our_architects_section','', $team_id);
    $response['our_engineers_section']=sdb_get_field('our_engineers_section','', $team_id);
    $response['join_us_section']=sdb_get_field('join_us_section','', $team_id);
    $response = inject_global_seo_data($response, $team_id);
    $response['seo']['canonical'] = get_headless_canonical_url($team_id);
    $response['schema'] = get_page_schema($team_id);
    $response = decode_entities_deep($response); 
    $final_teams_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_teams_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_teams_response);
}

/**For Data Engineering */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-engineering', [
        'methods'  => 'GET',
        'callback' => 'data_engineering_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_engineering_sections_qubewp() {
    $cache_key = 'data_engineering_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_eng_id=633;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_eng_id);
    $response['page_title'] = get_the_title($data_eng_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_eng_id)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_eng_id);
    $response['stats_section']=sdb_get_field('stats_section','', $data_eng_id);
    $response['data_engineers_data_challenges_section']=sdb_get_field('data_engineers_data_challenges','', $data_eng_id);
    $response['data_engineers_consultation_section']=sdb_get_field('data_engineers_consultation','', $data_eng_id);
    $response['data_engineers_service_we_offer_section']=sdb_get_field('data_engineers_service_we_offer','', $data_eng_id);
    $response['data_engineers_for_the_reliable_services_section']=sdb_get_field('data_engineers_for_the_reliable_services','', $data_eng_id);
    $response['data_engineers_engagement_models_section']=sdb_get_field('data_engineers_engagement_models','', $data_eng_id);
    $response['our_engineering_process_section']=sdb_get_field('our_engineering_process','', $data_eng_id);
    $response['data_engineers_hire_experts_section']=sdb_get_field('data_engineers_hire_experts','', $data_eng_id);
    $response['data_engineering_technology_stack_section']=sdb_get_field('data_engineering_technology_stack','', $data_eng_id);
    $response['data_engineers_benefits_of_choosing_section']=sdb_get_field('data_engineers_benefits_of_choosing','', $data_eng_id);
    $response['digital_security_compliance_section']=sdb_get_field('digital_security_compliance','', $data_eng_id);
    $response['certifications_section']=sdb_get_field('certifications','', $data_eng_id);
    $response['services_get_started_section_section']=sdb_get_field('services_get_started_section','', $data_eng_id);
    $response['data_engineers_security_brief_cta_section']=sdb_get_field('data_engineers_security_brief_cta','', $data_eng_id);
    $response = inject_global_seo_data($response, $data_eng_id);
    $response['seo']['canonical'] = get_headless_canonical_url($data_eng_id);
    $response['schema'] = get_page_schema($data_eng_id);
    $response = decode_entities_deep($response); 
    $final_data_engineering_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_engineering_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_engineering_response);
}



/**For Engineer As A Service */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/engineer-as-a-service', [
        'methods'  => 'GET',
        'callback' => 'engineer_as_a_service_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function engineer_as_a_service_sections_qubewp() {
    $cache_key = 'engineer_as_a_service_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $eng_as_a_id=615;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($eng_as_a_id);
    $response['page_title'] = get_the_title($eng_as_a_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $eng_as_a_id)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $eng_as_a_id);
    $response['stats_section']=sdb_get_field('stats_section','', $eng_as_a_id);
    
    $response['engineer_as_a_service_page_section']=sdb_get_field('engineer_as_a_service_page','', $eng_as_a_id);
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $eng_as_a_id);
    $response = inject_global_seo_data($response, $eng_as_a_id);
    $response['seo']['canonical'] = get_headless_canonical_url($eng_as_a_id);
    $response['schema'] = get_page_schema($eng_as_a_id);    
    $response = decode_entities_deep($response); 
    $final_engineer_as_a_service_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_engineer_as_a_service_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_engineer_as_a_service_response);
}


/**For Data Science */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-science', [
        'methods'  => 'GET',
        'callback' => 'data_science_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_science_sections_qubewp() {
    $cache_key = 'data_science_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_sci=646;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_sci);
    $response['page_title'] = get_the_title($data_sci);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_sci)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_sci);
    $response['stats_section']=sdb_get_field('stats_section','', $data_sci);
    $response['business_challenges_section_section']=sdb_get_field('business_challenges_section','', $data_sci);
    $response['data_science_services_we_offer_section']=sdb_get_field('data_science_services_we_offer','', $data_sci);
    $response['our_process_section']=sdb_get_field('our_process_section','', $data_sci);    
    $response['how_we_work_section']=sdb_get_field('how_we_work_section','', $data_sci);    
    $response['why_choose_section']=sdb_get_field('why_choose_section','', $data_sci);    
    $response['tech_stack_tools_section']=sdb_get_field('tech_stack_tools_section','', $data_sci);    
    $response['security_and_compliance_section']=sdb_get_field('security_and_compliance_section','', $data_sci);    
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_sci);    
    $response = inject_global_seo_data($response, $data_sci);
    $response['seo']['canonical'] = get_headless_canonical_url($data_sci);
    $response['schema'] = get_page_schema($data_sci);
    $response = decode_entities_deep($response); 
    $final_data_science_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_science_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_science_response);
}

/**For AL ML Page */
add_action('rest_api_init', function () {

    register_rest_route('v1', '/ai-ml-solutions', [
        'methods'  => 'GET',
        'callback' => 'ai_ml_solutions_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function ai_ml_solutions_sections_qubewp() {
    $cache_key = 'ai_ml_solutions_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $ai_ml = 732; // AI ML Solutions Page ID
    $response = [];

    $response = get_fields($ai_ml);
    $response['page_title'] = get_the_title($ai_ml);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $ai_ml)
    );

    $response['banner_section'] = sdb_get_field('main_banner','', $ai_ml);
    $response['stats_section'] = sdb_get_field('stats_section','', $ai_ml);
    $response['ai_ml_challenges_section'] = sdb_get_field('ai_ml_challenges_section','', $ai_ml);
    $response['core_services_section'] = sdb_get_field('core_services_section','', $ai_ml);
    $response['advanced_capabilities_section'] = sdb_get_field('advanced_capabilities_section','', $ai_ml);    
    $response['engagement_models_section'] = sdb_get_field('engagement_models_section','', $ai_ml);    
    $response['how_our_engineers_work_section'] = sdb_get_field('how_our_engineers_work_section','', $ai_ml);    
    $response['why_choose_ai_ml_section'] = sdb_get_field('why_choose_ai_ml_section','', $ai_ml);    
    $response['security_and_compliance_section'] = sdb_get_field('security_and_compliance_section','', $ai_ml);    
    $response['key_benefits_section'] = sdb_get_field('key_benefits_section','', $ai_ml);    
    $response['services_get_started_section'] = sdb_get_field('services_get_started_section','', $ai_ml);
    $response = inject_global_seo_data($response, $ai_ml);
    $response['seo']['canonical'] = get_headless_canonical_url($ai_ml);
    $response['schema'] = get_page_schema($ai_ml);

    $response = decode_entities_deep($response);

    $final_ai_ml_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    
    set_transient($cache_key, $final_ai_ml_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_ai_ml_response);
}


/**For Privacy Policy */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/privacy-policy', [
        'methods'  => 'GET',
        'callback' => 'privacy_policy_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function privacy_policy_sections_qubewp() {
    $privacy_id=3;
    $response = [];
    $response['page_title'] = get_the_title($privacy_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $privacy_id)
    );
    $response['last_updated'] = get_the_modified_date('d-M-Y', $privacy_id);
    $response = inject_global_seo_data($response, $privacy_id);
    $response['seo']['canonical'] = get_headless_canonical_url($privacy_id);
    $response = decode_entities_deep($response); 
    return rest_ensure_response([
        'status' => true,
        'data'   => $response
    ]);
    
}


/**For Terms & Conditions */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/terms-conditions', [
        'methods'  => 'GET',
        'callback' => 'terms_conditions_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function terms_conditions_sections_qubewp() {
    $terms_conditions_id=927;
    $response = [];
    $response['page_title'] = get_the_title($terms_conditions_id);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $terms_conditions_id)
    );
    $response['last_updated'] = get_the_modified_date('d-m-Y', $terms_conditions_id);
    $response = inject_global_seo_data($response, $terms_conditions_id);
    $response['seo']['canonical'] = get_headless_canonical_url($terms_conditions_id);
    $response = decode_entities_deep($response); 
    return rest_ensure_response([
        'status' => true,
        'data'   => $response
    ]);
    
}




add_action('rest_api_init', function () {
    register_rest_route('v1', '/careers', [
        'methods'  => 'GET',
        'callback' => 'careers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function careers_sections_qubewp() {

    $cache_key = 'careers_api_cache';

    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }

    $careers_id = 992; // Careers Page ID

    if (!$careers_id) {
        return rest_ensure_response([
            'status' => false,
            'message' => 'Careers page not set'
        ]);
    }

    $response['careers_data'] = sdb_get_field('careers_page_59','', $careers_id);
    $response = inject_global_seo_data($response, $careers_id);
    $response['seo']['canonical'] = get_headless_canonical_url($careers_id);
     // Add careers JSON-LD schema
    $response['schema'] = get_page_schema($careers_id);
    $response = decode_entities_deep($response); 
    $final_response = [
        'status' => true,
        'data'   => $response
    ];

    // Cache for 1 hour
    set_transient($cache_key, $final_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_response);
}


add_action('rest_api_init', function () {
    register_rest_route('v1', '/alljobs', [
        'methods'  => 'GET',
        'callback' => 'alljobs_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function alljobs_sections_qubewp($request) {

    // $cache_key = 'alljobs_api_cache';

    // // // Try cache
    // $cached = get_transient($cache_key);
    // if ($cached !== false) {
    //     return rest_ensure_response($cached);
    // }
    $job_slug   = $request->get_param('slug');
    // CPT: job_careers posts
    $args = [
        'post_type'      => 'job_careers',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'date',
        'name' => $job_slug ? sanitize_title($job_slug) : '', 
    ];
    $jobs_query = new WP_Query($args);

    $jobs = [];

    if ($jobs_query->have_posts()) {
        while ($jobs_query->have_posts()) {
            $jobs_query->the_post();

            $jobs[] = [
                'id'          => get_the_ID(),
                'title'       => get_the_title(),
                'content'     => get_the_content(),
                'excerpt'     => get_the_excerpt(),
                'link'        => get_permalink(),
                'slug'    => get_post_field('post_name', get_the_ID()),
                'date'        => get_the_date(),
                 // Custom Taxonomy
                'job_categories' => array_map(function($term) {
                    return [
                        'id'   => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug
                    ];
                }, get_the_terms(get_the_ID(), 'job_career_category') ?: []),
                'job_career_department' => array_map(function($term) {
                    return [
                        'id'   => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug
                    ];
                }, get_the_terms(get_the_ID(), 'job_career_department') ?: []),
                'job_career_hire_type' => array_map(function($term) {
                    return [
                        'id'   => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug
                    ];
                }, get_the_terms(get_the_ID(), 'job_career_hire_type') ?: []),


                'job_career_city' => array_map(function($term) {
                    return [
                        'id'   => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug
                    ];
                }, get_the_terms(get_the_ID(), 'job_career_city') ?: []),

                'job_career_country' => array_map(function($term) {
                    return [
                        'id'   => $term->term_id,
                        'name' => $term->name,
                        'slug' => $term->slug
                    ];
                }, get_the_terms(get_the_ID(), 'job_career_country') ?: []),

                'content' => sdb_get_field('careers_job', '', get_the_ID())
            ];
        }
        wp_reset_postdata();
    $response['jobs'] = $jobs;

    // SEO + Schema
    $response = inject_global_seo_data($response, get_the_ID());
    $response['seo']['canonical'] = get_headless_canonical_url(get_the_ID());
    $response['schema'] = get_page_schema(get_the_ID());
    $response = decode_entities_deep($response); 
    $final_response = [
        'status' => true,
        'data'   => $response
    ];

        }
    else {
        $final_response = [
        'status' => true,
        'data'   => 'No Job Found'
    ];
    }

    

    // Cache 1 hour
   // set_transient($cache_key, $final_response, HOUR_IN_SECONDS);

    return rest_ensure_response($final_response);
}


/**For On-Demand Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/on-demand-engineers', [
        'methods'  => 'GET',
        'callback' => 'on_demand_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function on_demand_engineers_sections_qubewp() {
    $cache_key = 'on_demand_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_sci=1021;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_sci);
    $response['page_title'] = get_the_title($data_sci);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_sci)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_sci);
    $response['stats_section']=sdb_get_field('stats_section','', $data_sci);
    $response['on_demand_engineers_boost_results_section']=sdb_get_field('on_demand_engineers_boost_results','', $data_sci);
    $response['on_demand_engineers_services_section']=sdb_get_field('on_demand_engineers_services_section','', $data_sci);
    $response['data_engineers_security_brief_cta_section']=sdb_get_field('data_engineers_security_brief_cta','', $data_sci);    
    $response['how_our_staff_on_demand_engineers']=sdb_get_field('how_our_staff_on_demand_engineers','', $data_sci);    
    $response['engineer_first_approach_on_demand_engineers']=sdb_get_field('engineer_first_approach_on_demand_engineers','', $data_sci);    
    $response['data_engineers_data_challenges']=sdb_get_field('data_engineers_data_challenges','', $data_sci);    
    $response['pricing_and_engagement_on_demand_engineers']=sdb_get_field('pricing_and_engagement_on_demand_engineers','', $data_sci);    
    $response['security_compliance_on_demand_engineers']=sdb_get_field('security_compliance_on_demand_engineers','', $data_sci);    
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_sci);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_sci);    
    $response = inject_global_seo_data($response, $data_sci);
    $response['seo']['canonical'] = get_headless_canonical_url($data_sci);
    $response['schema'] = get_page_schema($data_sci);
    $response = decode_entities_deep($response); 
    $final_on_demand_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_on_demand_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_on_demand_engineers_response);
}



/**For Offshore Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/offshore-engineers', [
        'methods'  => 'GET',
        'callback' => 'offshore_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function offshore_engineers_sections_qubewp() {
    $cache_key = 'offshore_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_offshore=1191;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_offshore);
    $response['page_title'] = get_the_title($data_offshore);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_offshore)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_offshore);
    $response['stats_section']=sdb_get_field('stats_section','', $data_offshore);
    $response['what_is_offshore_and_nearshore_setup_section']=sdb_get_field('what_is_offshore_and_nearshore_setup_section','', $data_offshore);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_offshore);
    $response['data_engineers_data_challenges']=sdb_get_field('data_engineers_data_challenges','', $data_offshore);  
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_offshore);    
    $response['key_questions_for_gcc']=sdb_get_field('key_questions_for_gcc','', $data_offshore);    
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $data_offshore);    
    $response['offshore_vs_nearshore_setup']=sdb_get_field('offshore_vs_nearshore_setup','', $data_offshore);    
    $response['offshore_vs_nearshore']=sdb_get_field('offshore_vs_nearshore','', $data_offshore);    
    $response['when_should_you_consider_offshore']=sdb_get_field('when_should_you_consider_offshore','', $data_offshore);      
    $response['global_capability_centre']=sdb_get_field('global_capability_centre','', $data_offshore);          
    $response['what_is_a_center_of_excellence']=sdb_get_field('what_is_a_center_of_excellence','', $data_offshore);          
    $response['our_offshore_and_nearshore_setup_services']=sdb_get_field('our_offshore_and_nearshore_setup_services','', $data_offshore);          
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $data_offshore);          
    $response['our_gcc_coe_setup_process']=sdb_get_field('our_gcc_coe_setup_process','', $data_offshore);          
    

    

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_offshore);    
    $response = inject_global_seo_data($response, $data_offshore);
    $response['seo']['canonical'] = get_headless_canonical_url($data_offshore);
    $response['schema'] = get_page_schema($data_offshore);
    $response = decode_entities_deep($response); 
    $final_offshore_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_offshore_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_offshore_engineers_response);
}



/**For Tech Team Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/tech-team-engineers', [
        'methods'  => 'GET',
        'callback' => 'tech_team_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function tech_team_engineers_sections_qubewp() {
    $cache_key = 'tech_team_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_tech_team=1216;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_tech_team);
    $response['page_title'] = get_the_title($data_tech_team);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_tech_team)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_tech_team);
    $response['stats_section']=sdb_get_field('stats_section','', $data_tech_team);
	$response['scale_your_team_with_the_right_talent']=sdb_get_field('scale_your_team_with_the_right_talent','', $data_tech_team);
	$response['why_businesses_choose_tech_team_building_services']=sdb_get_field('why_businesses_choose_tech_team_building_services','', $data_tech_team);	
$response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_tech_team);
$response['we_build_teams_around_your_needs']=sdb_get_field('we_build_teams_around_your_needs','', $data_tech_team);    

	$response['engineer_first_approach_on_demand_engineers']=sdb_get_field('engineer_first_approach_on_demand_engineers','', $data_tech_team);    
	$response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_tech_team);    
	$response['services_included_in_our_tech_team_building_solutions']=sdb_get_field('services_included_in_our_tech_team_building_solutions','', $data_tech_team);    	
$response['industries_we_support']=sdb_get_field('industries_we_support','', $data_tech_team);    		
$response['benefits_of_partnering_with_code1_tech']=sdb_get_field('benefits_of_partnering_with_code1_tech','', $data_tech_team);    			
	
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_tech_team);    
    $response = inject_global_seo_data($response, $data_tech_team);
    $response['seo']['canonical'] = get_headless_canonical_url($data_tech_team);
    $response['schema'] = get_page_schema($data_tech_team);
    $response = decode_entities_deep($response); 
    $final_tech_team_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_tech_team_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_tech_team_engineers_response);
}




/**For Managed Services Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/managed-services-engineers', [
        'methods'  => 'GET',
        'callback' => 'managed_services_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function managed_services_engineers_sections_qubewp() {
    $cache_key = 'managed_services_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_managed_services=1218;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_managed_services);
    $response['page_title'] = get_the_title($data_managed_services);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_managed_services)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_managed_services);
    $response['stats_section']=sdb_get_field('stats_section','', $data_managed_services);
    $response['managed_it_services_for_your_business_growth']=sdb_get_field('managed_it_services_for_your_business_growth','', $data_managed_services);
    $response['engineer_first_approach_on_demand_engineers']=sdb_get_field('engineer_first_approach_on_demand_engineers','', $data_managed_services);
    $response['traditional_it_vs_managed_it']=sdb_get_field('traditional_it_vs_managed_it','', $data_managed_services);
    $response['our_core_managed_it_services']=sdb_get_field('our_core_managed_it_services','', $data_managed_services);
    $response['simple_3_step_process_to_hire_managed_it_services']=sdb_get_field('simple_3_step_process_to_hire_managed_it_services','', $data_managed_services);    
    $response['why_smbs_enterprises_choose_us']=sdb_get_field('why_smbs_enterprises_choose_us','', $data_managed_services);    
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $data_managed_services);    
    $response['choose_a_managed_it_service_plan_that_works_for_you']=sdb_get_field('choose_a_managed_it_service_plan_that_works_for_you','', $data_managed_services);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_managed_services);    
    $response['ready_to_take_it_off_your_plate']=sdb_get_field('ready_to_take_it_off_your_plate','', $data_managed_services);    
    $response['get_started_today']=sdb_get_field('get_started_today','', $data_managed_services);    

    $response['your_growth_deserves_better_it']=sdb_get_field('your_growth_deserves_better_it','', $data_managed_services);       
    
    
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_managed_services);    
    $response = inject_global_seo_data($response, $data_managed_services);
    $response['seo']['canonical'] = get_headless_canonical_url($data_managed_services);
    $response['schema'] = get_page_schema($data_managed_services);
    $response = decode_entities_deep($response); 
    $final_managed_services_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_managed_services_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_managed_services_engineers_response);
}



/**For Data Ingestion Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-ingestion-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_ingestion_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_ingestion_engineers_sections_qubewp() {
    $cache_key = 'data_ingestion_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_data_ingestion_engineers=1221;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_data_ingestion_engineers);
    $response['page_title'] = get_the_title($data_data_ingestion_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_data_ingestion_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_data_ingestion_engineers);
    $response['data_integration_solutions_for_your_business_challenges']=sdb_get_field('data_integration_solutions_for_your_business_challenges','', $data_data_ingestion_engineers);
    $response['data_ingestion_data_integration_services_we_offer']=sdb_get_field('data_ingestion_data_integration_services_we_offer','', $data_data_ingestion_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_data_ingestion_engineers);
    $response['advanced_data_integration_capabilities_for_modern_enterprises']=sdb_get_field('advanced_data_integration_capabilities_for_modern_enterprises','', $data_data_ingestion_engineers);
    $response['from_disconnected_data_to_business_value']=sdb_get_field('from_disconnected_data_to_business_value','', $data_data_ingestion_engineers);    
    $response['our_data_integration_engagement_models']=sdb_get_field('our_data_integration_engagement_models','', $data_data_ingestion_engineers);    
    $response['why_choose_code1tech_for_data_ingestion_integration']=sdb_get_field('why_choose_code1tech_for_data_ingestion_integration','', $data_data_ingestion_engineers);    
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $data_data_ingestion_engineers);    
    $response['tech_stack_tools']=sdb_get_field('tech_stack_tools','', $data_data_ingestion_engineers);    
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_data_ingestion_engineers);    
    $response = inject_global_seo_data($response, $data_data_ingestion_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_data_ingestion_engineers);
    $response['schema'] = get_page_schema($data_data_ingestion_engineers);
    $response = decode_entities_deep($response); 
    $final_data_ingestion_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_ingestion_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_ingestion_engineers_response);
}




/**For Data Warehousing Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-warehouse-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_warehouse_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_warehouse_engineers_sections_qubewp() {
    $cache_key = 'data_warehouse_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_warehouse_engineers=1251;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_warehouse_engineers);
    $response['page_title'] = get_the_title($data_warehouse_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_warehouse_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_warehouse_engineers);
    $response['build_a_trusted_foundation_for_analytics_reporting_ai']=sdb_get_field('build_a_trusted_foundation_for_analytics_reporting_ai','', $data_warehouse_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_warehouse_engineers); 

    $response['data_warehouse_vs_data_lakehouse']=sdb_get_field('data_warehouse_vs_data_lakehouse','', $data_warehouse_engineers); 

    $response['cta_section_70']=sdb_get_field('cta_section_70','', $data_warehouse_engineers);     

    $response['our_data_warehousing_services']=sdb_get_field('our_data_warehousing_services','', $data_warehouse_engineers);     

    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_warehouse_engineers);     

    $response['our_data_lakehouse_services']=sdb_get_field('our_data_lakehouse_services','', $data_warehouse_engineers);     

    $response['cta_section_104']=sdb_get_field('cta_section_104','', $data_warehouse_engineers);     

    $response['data_warehouse_vs_data_lakehouse_which_is_right_for_your_business']=sdb_get_field('data_warehouse_vs_data_lakehouse_which_is_right_for_your_business','', $data_warehouse_engineers);     

    $response['cta_section_77']=sdb_get_field('cta_section_77','', $data_warehouse_engineers);     

    $response['cloud_data_platforms_we_support']=sdb_get_field('cloud_data_platforms_we_support','', $data_warehouse_engineers);     

    $response['data_warehouse_lakehouse_migration_services']=sdb_get_field('data_warehouse_lakehouse_migration_services','', $data_warehouse_engineers);     

    $response['cta_section_111']=sdb_get_field('cta_section_111','', $data_warehouse_engineers);     

    $response['security_governance_compliance']=sdb_get_field('security_governance_compliance','', $data_warehouse_engineers);     

    $response['cta_section_113']=sdb_get_field('cta_section_113','', $data_warehouse_engineers);     

    $response['why_choose_code1tech_for_warehousing_lakehouse']=sdb_get_field('why_choose_code1tech_for_warehousing_lakehouse','', $data_warehouse_engineers);     

    $response['cta_section_114']=sdb_get_field('cta_section_114','', $data_warehouse_engineers);     

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_warehouse_engineers);    
    $response = inject_global_seo_data($response, $data_warehouse_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_warehouse_engineers);
    $response['schema'] = get_page_schema($data_warehouse_engineers);
    $response = decode_entities_deep($response); 
    $final_data_warehouse_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_warehouse_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_warehouse_engineers_response);
}


/**For Advanced Data Architecture Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-advanced-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_advanced_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_advanced_engineers_sections_qubewp() {
    $cache_key = 'data_advanced_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_advanced_engineers=1269;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_advanced_engineers);
    $response['page_title'] = get_the_title($data_advanced_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_advanced_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_advanced_engineers);
    $response['modern_data_platform_design']=sdb_get_field('modern_data_platform_design','', $data_advanced_engineers);
    $response['data_vault_modeling']=sdb_get_field('data_vault_modeling','', $data_advanced_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_advanced_engineers);
    $response['data_mesh_data_fabric_strategy']=sdb_get_field('data_mesh_data_fabric_strategy','', $data_advanced_engineers);
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_advanced_engineers);
    $response['cloud_data_architecture_services']=sdb_get_field('cloud_data_architecture_services','', $data_advanced_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $data_advanced_engineers);    
    $response['our_process_from_data_complexity_to_business_clarity']=sdb_get_field('our_process_from_data_complexity_to_business_clarity','', $data_advanced_engineers);    
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $data_advanced_engineers);        
    $response['our_data_architecture_engagement_models']=sdb_get_field('our_data_architecture_engagement_models','', $data_advanced_engineers);        
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $data_advanced_engineers);        
    $response['why_choose_code1tech_for_data_modeling_architecture_services']=sdb_get_field('why_choose_code1tech_for_data_modeling_architecture_services','', $data_advanced_engineers);            
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $data_advanced_engineers);                
    $response['technology_stack_platforms']=sdb_get_field('technology_stack_platforms','', $data_advanced_engineers);                
    $response['security_compliance']=sdb_get_field('security_compliance','', $data_advanced_engineers);                        
    

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_advanced_engineers);    
    $response = inject_global_seo_data($response, $data_advanced_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_advanced_engineers);
    $response['schema'] = get_page_schema($data_advanced_engineers);
    $response = decode_entities_deep($response); 
    $final_data_advanced_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_advanced_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_advanced_engineers_response);
}



/**For Data Quality Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-quality-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_quality_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_quality_engineers_sections_qubewp() {
    $cache_key = 'data_quality_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_quality_engineers=1290;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_quality_engineers);
    $response['page_title'] = get_the_title($data_quality_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_quality_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_quality_engineers);
    $response['build_trust_in_your_data_with_governance_and_quality']=sdb_get_field('build_trust_in_your_data_with_governance_and_quality','', $data_quality_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $data_quality_engineers);
    $response['data_governance_data_quality_solutions_for_your_business_challenges']=sdb_get_field('data_governance_data_quality_solutions_for_your_business_challenges','', $data_quality_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $data_quality_engineers);
    $response['data_governance_services_we_offer']=sdb_get_field('data_governance_services_we_offer','', $data_quality_engineers);    
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $data_quality_engineers);        
    $response['data_quality_services_we_offer']=sdb_get_field('data_quality_services_we_offer','', $data_quality_engineers);            
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $data_quality_engineers);            
    $response['our_process_from_data_challenges_to_trusted_data']=sdb_get_field('our_process_from_data_challenges_to_trusted_data','', $data_quality_engineers);            
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $data_quality_engineers);                
    $response['our_engagement_models']=sdb_get_field('our_engagement_models','', $data_quality_engineers);                
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $data_quality_engineers);                
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $data_quality_engineers);                    
    $response['cta_section_131']=sdb_get_field('cta_section_131','', $data_quality_engineers);                    
    $response['technology_platform_expertise']=sdb_get_field('technology_platform_expertise','', $data_quality_engineers);
    $response['cta_section_133']=sdb_get_field('cta_section_133','', $data_quality_engineers);
    $response['why_choose_code1tech_as_your_data_governance_company']=sdb_get_field('why_choose_code1tech_as_your_data_governance_company','', $data_quality_engineers);
    $response['cta_section_135']=sdb_get_field('cta_section_135','', $data_quality_engineers);
    
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_quality_engineers);    
    $response = inject_global_seo_data($response, $data_quality_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_quality_engineers);
    $response['schema'] = get_page_schema($data_quality_engineers);
    $response = decode_entities_deep($response); 
    $final_data_quality_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_quality_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_quality_engineers_response);
}




/**For Data Clould Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-cloud-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_cloud_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_cloud_engineers_sections_qubewp() {
    $cache_key = 'data_cloud_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_cloud_engineers=1305;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_cloud_engineers);
    $response['page_title'] = get_the_title($data_cloud_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_cloud_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_cloud_engineers);
    $response['accelerate_digital_transformation_with_cloud_migration_and_modernization']=sdb_get_field('accelerate_digital_transformation_with_cloud_migration_and_modernization','', $data_cloud_engineers);
    $response['cloud_migration_and_modernization_solutions_for_your_business_challenges']=sdb_get_field('cloud_migration_and_modernization_solutions_for_your_business_challenges','', $data_cloud_engineers);
    $response['build_a_successful_cloud_migration_strategy']=sdb_get_field('build_a_successful_cloud_migration_strategy','', $data_cloud_engineers);
    $response['end_to_end_cloud_migration_services']=sdb_get_field('end_to_end_cloud_migration_services','', $data_cloud_engineers);
    $response['cloud_modernization_services']=sdb_get_field('cloud_modernization_services','', $data_cloud_engineers);
    $response['aws_azure_and_google_cloud_migration_services']=sdb_get_field('aws_azure_and_google_cloud_migration_services','', $data_cloud_engineers);
    $response['multi_cloud_and_hybrid_cloud_solutions']=sdb_get_field('multi_cloud_and_hybrid_cloud_solutions','', $data_cloud_engineers);
    $response['cloud_security_and_governance_services']=sdb_get_field('cloud_security_and_governance_services','', $data_cloud_engineers);
    $response['cloud_cost_optimization_services']=sdb_get_field('cloud_cost_optimization_services','', $data_cloud_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_cloud_engineers);
    $response['managed_cloud_operations_services']=sdb_get_field('managed_cloud_operations_services','', $data_cloud_engineers);
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $data_cloud_engineers);
    $response['our_cloud_migration_and_modernization_process']=sdb_get_field('our_cloud_migration_and_modernization_process','', $data_cloud_engineers);
    $response['technology_and_platform_expertise']=sdb_get_field('technology_and_platform_expertise','', $data_cloud_engineers);
    $response['why_choose_code1tech_as_your_cloud_migration_company']=sdb_get_field('why_choose_code1tech_as_your_cloud_migration_company','', $data_cloud_engineers);



    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_cloud_engineers);    
    $response = inject_global_seo_data($response, $data_cloud_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_cloud_engineers);
    $response['schema'] = get_page_schema($data_cloud_engineers);
    $response = decode_entities_deep($response); 
    $final_data_cloud_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_cloud_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_cloud_engineers_response);
}



/**For Data DataOps Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-dataops-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_dataops_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_dataops_engineers_sections_qubewp() {
    $cache_key = 'data_dataops_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_dataops_engineers=1320;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_dataops_engineers);
    $response['page_title'] = get_the_title($data_dataops_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_dataops_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $data_dataops_engineers);
    $response['build_trusted_data_pipelines_with_modern_dataops_practices']=sdb_get_field('build_trusted_data_pipelines_with_modern_dataops_practices','', $data_dataops_engineers);
    $response['simplify_data_operations_through_automation']=sdb_get_field('simplify_data_operations_through_automation','', $data_dataops_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $data_dataops_engineers);
    $response['build_a_dataops_strategy_that_supports_business_growth']=sdb_get_field('build_a_dataops_strategy_that_supports_business_growth','', $data_dataops_engineers);
    $response['improve_data_reliability_and_operational_visibility']=sdb_get_field('improve_data_reliability_and_operational_visibility','', $data_dataops_engineers);
    $response['strengthen_data_quality_throughout_your_data_lifecycle']=sdb_get_field('strengthen_data_quality_throughout_your_data_lifecycle','', $data_dataops_engineers);
    $response['orchestrate_and_manage_complex_data_pipelines_with_confidence']=sdb_get_field('orchestrate_and_manage_complex_data_pipelines_with_confidence','', $data_dataops_engineers);
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $data_dataops_engineers);
    $response['support_analytics_reporting_and_ai_initiatives']=sdb_get_field('support_analytics_reporting_and_ai_initiatives','', $data_dataops_engineers);
    $response['integrate_governance_into_everyday_data_operations']=sdb_get_field('integrate_governance_into_everyday_data_operations','', $data_dataops_engineers);
    $response['managed_dataops_services_for_continuous_improvement']=sdb_get_field('managed_dataops_services_for_continuous_improvement','', $data_dataops_engineers);
    $response['why_choose_code1tech_for_dataops_services']=sdb_get_field('why_choose_code1tech_for_dataops_services','', $data_dataops_engineers);


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_dataops_engineers);    
    $response = inject_global_seo_data($response, $data_dataops_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_dataops_engineers);
    $response['schema'] = get_page_schema($data_dataops_engineers);

    $response = decode_entities_deep($response); 
    $final_data_dataops_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_dataops_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_dataops_engineers_response);
}



/**For Business Intelligence Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/business-intelligence-engineers', [
        'methods'  => 'GET',
        'callback' => 'business_intelligence_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function business_intelligence_engineers_sections_qubewp() {
    $cache_key = 'business_intelligence_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $business_intelligence_engineers=1349;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($business_intelligence_engineers);
    $response['page_title'] = get_the_title($business_intelligence_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $business_intelligence_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $business_intelligence_engineers);
    $response['why_businesses_need_modern_business_intelligence_services']=sdb_get_field('why_businesses_need_modern_business_intelligence_services','', $business_intelligence_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $business_intelligence_engineers); 
    $response['comprehensive_business_intelligence_and_data_analytics_services']=sdb_get_field('comprehensive_business_intelligence_and_data_analytics_services','', $business_intelligence_engineers); 
    $response['data_analytics_consulting_services']=sdb_get_field('data_analytics_consulting_services','', $business_intelligence_engineers);     
    $response['business_intelligence_consulting_services']=sdb_get_field('business_intelligence_consulting_services','', $business_intelligence_engineers);     
    $response['business_intelligence_solutions_and_dashboard_development']=sdb_get_field('business_intelligence_solutions_and_dashboard_development','', $business_intelligence_engineers);     
    $response['business_intelligence_solutions_and_dashboard_development']=sdb_get_field('business_intelligence_solutions_and_dashboard_development','', $business_intelligence_engineers);     
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $business_intelligence_engineers);     
    $response['how_our_business_intelligence_experts_help_you_from_strategy_to_business_impact']=sdb_get_field('how_our_business_intelligence_experts_help_you_from_strategy_to_business_impact','', $business_intelligence_engineers);     
    $response['industry_specific_business_intelligence_solutions']=sdb_get_field('industry_specific_business_intelligence_solutions','', $business_intelligence_engineers);     
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $business_intelligence_engineers);     
    $response['why_choose_code1_tech_systems_as_your_data_analytics_consulting_company']=sdb_get_field('why_choose_code1_tech_systems_as_your_data_analytics_consulting_company','', $business_intelligence_engineers);     
    $response['cta_testimonials']=sdb_get_field('cta_testimonials','', $business_intelligence_engineers);     
    
    

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $business_intelligence_engineers);    
    $response = inject_global_seo_data($response, $business_intelligence_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($business_intelligence_engineers);
    $response['schema'] = get_page_schema($business_intelligence_engineers);
    $response = decode_entities_deep($response); 
    $final_business_intelligence_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_business_intelligence_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_business_intelligence_engineers_response);
}



/**For Business Intelligence Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/predictive-engineers', [
        'methods'  => 'GET',
        'callback' => 'predictive_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function predictive_engineers_sections_qubewp() {
    $cache_key = 'predictive_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $predictive_engineers=1370;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($predictive_engineers);
    $response['page_title'] = get_the_title($predictive_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $predictive_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $predictive_engineers);
    $response['why_organizations_invest_in_predictive_advanced_analytics']=sdb_get_field('why_organizations_invest_in_predictive_advanced_analytics','', $predictive_engineers); 
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $predictive_engineers);     
    $response['our_predictive_advanced_analytics_services']=sdb_get_field('our_predictive_advanced_analytics_services','', $predictive_engineers);     
    $response['ai_powered_predictive_analytics_solutions']=sdb_get_field('ai_powered_predictive_analytics_solutions','', $predictive_engineers);         
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $predictive_engineers);         
    $response['how_our_predictive_analytics_experts_help_you']=sdb_get_field('how_our_predictive_analytics_experts_help_you','', $predictive_engineers);             
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $predictive_engineers);             
    $response['predictive_analytics_use_cases_across_industries']=sdb_get_field('predictive_analytics_use_cases_across_industries','', $predictive_engineers);                 
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $predictive_engineers);                 
    $response['why_choose_code1_tech_systems_for_predictive_advanced_analytics_services']=sdb_get_field('why_choose_code1_tech_systems_for_predictive_advanced_analytics_services','', $predictive_engineers);                 
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $predictive_engineers);                 
    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $predictive_engineers);    
    $response = inject_global_seo_data($response, $predictive_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($predictive_engineers);
    $response['schema'] = get_page_schema($predictive_engineers);
    $response = decode_entities_deep($response); 
    $final_predictive_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_predictive_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_predictive_engineers_response);
}




/**For Big Data Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/big-data-engineers', [
        'methods'  => 'GET',
        'callback' => 'big_data_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function big_data_engineers_sections_qubewp() {
    $cache_key = 'big_data_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $big_data_engineers=1380;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($big_data_engineers);
    $response['page_title'] = get_the_title($big_data_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $big_data_engineers)
    );
    $response['banner_section']=sdb_get_field('main_banner','', $big_data_engineers);
    $response['why_organizations_invest_in_big_data_services']=sdb_get_field('why_organizations_invest_in_big_data_services','', $big_data_engineers);
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $big_data_engineers);
    $response['our_big_data_services']=sdb_get_field('our_big_data_services','', $big_data_engineers);    
    $response['big_data_consulting_services']=sdb_get_field('big_data_consulting_services','', $big_data_engineers);    
    $response['big_data_architecture_platform_development']=sdb_get_field('big_data_architecture_platform_development','', $big_data_engineers);    
	$response['data_lake_data_warehouse_solutions']=sdb_get_field('data_lake_data_warehouse_solutions','', $big_data_engineers);           
    $response['big_data_engineering_services']=sdb_get_field('big_data_engineering_services','', $big_data_engineers);           
    $response['big_data_solutions_for_analytics_ai_and_innovation']=sdb_get_field('big_data_solutions_for_analytics_ai_and_innovation','', $big_data_engineers);           
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $big_data_engineers);           
    $response['how_our_big_data_experts_help_you']=sdb_get_field('how_our_big_data_experts_help_you','', $big_data_engineers);               
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $big_data_engineers);                   
    $response['big_data_use_cases_across_industries']=sdb_get_field('big_data_use_cases_across_industries','', $big_data_engineers);                   
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $big_data_engineers);                   
    $response['why_choose_code1_tech_systems_for_big_data_services']=sdb_get_field('why_choose_code1_tech_systems_for_big_data_services','', $big_data_engineers);                   
    $response['cta_testimonials_button']=sdb_get_field('cta_testimonials_button','', $big_data_engineers);                   
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $big_data_engineers);    
    $response = inject_global_seo_data($response, $big_data_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($big_data_engineers);
    $response['schema'] = get_page_schema($big_data_engineers);
    $response = decode_entities_deep($response); 
    $final_big_data_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_big_data_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_big_data_engineers_response);
}




/**For DataBricks Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/data-bricks-engineers', [
        'methods'  => 'GET',
        'callback' => 'data_bricks_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function data_bricks_engineers_sections_qubewp() {
    $cache_key = 'data_bricks_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $data_bricks_engineers=1400;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($data_bricks_engineers);
    $response['page_title'] = get_the_title($data_bricks_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $data_bricks_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $data_bricks_engineers);
    $response['modernize_your_data_analytics_and_ai_with_databricks_consulting_services']=sdb_get_field('modernize_your_data_analytics_and_ai_with_databricks_consulting_services','', $data_bricks_engineers);
    $response['why_choose_the_databricks_platform']=sdb_get_field('why_choose_the_databricks_platform','', $data_bricks_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $data_bricks_engineers);
    $response['our_databricks_consulting_services']=sdb_get_field('our_databricks_consulting_services','', $data_bricks_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $data_bricks_engineers);        
    $response['ensuring_seamless_migration_to_databricks']=sdb_get_field('ensuring_seamless_migration_to_databricks','', $data_bricks_engineers);        
    $response['how_our_databricks_consultants_help_you']=sdb_get_field('how_our_databricks_consultants_help_you','', $data_bricks_engineers);        
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $data_bricks_engineers);        
    $response['databricks_solutions_for_modern_data_ai']=sdb_get_field('databricks_solutions_for_modern_data_ai','', $data_bricks_engineers);        
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $data_bricks_engineers);        
    $response['why_choose_code1_tech_systems_for_databricks_consulting']=sdb_get_field('why_choose_code1_tech_systems_for_databricks_consulting','', $data_bricks_engineers);        
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $data_bricks_engineers);            
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $data_bricks_engineers);    
    $response = inject_global_seo_data($response, $data_bricks_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($data_bricks_engineers);
    $response['schema'] = get_page_schema($data_bricks_engineers);
    $response = decode_entities_deep($response); 
    $final_data_bricks_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_data_bricks_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_data_bricks_engineers_response);
}




/**For Snowflake Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/snowflake-engineers', [
        'methods'  => 'GET',
        'callback' => 'snowflake_engineers_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function snowflake_engineers_sections_qubewp() {
    $cache_key = 'snowflake_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $snowflake_engineers=1413;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($snowflake_engineers);
    $response['page_title'] = get_the_title($snowflake_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $snowflake_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $snowflake_engineers);
    $response['turn_data_into_decisions_with_snowflake_consulting_services']=sdb_get_field('turn_data_into_decisions_with_snowflake_consulting_services','', $snowflake_engineers);
    $response['why_organizations_choose_snowflake']=sdb_get_field('why_organizations_choose_snowflake','', $snowflake_engineers);
    $response['expert_snowflake_consulting']=sdb_get_field('expert_snowflake_consulting','', $snowflake_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $snowflake_engineers);
    $response['code1_tech_system_making_snowflake_migration_feel_like_progress']=sdb_get_field('code1_tech_system_making_snowflake_migration_feel_like_progress','', $snowflake_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $snowflake_engineers);
    $response['supporting_every_stage_of_your_snowflake_journey']=sdb_get_field('supporting_every_stage_of_your_snowflake_journey','', $snowflake_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $snowflake_engineers);
    $response['creating_a_platform_teams_actually_want_to_use']=sdb_get_field('creating_a_platform_teams_actually_want_to_use','', $snowflake_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $snowflake_engineers);
    $response['why_organizations_trust_code1_tech_systems']=sdb_get_field('why_organizations_trust_code1_tech_systems','', $snowflake_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $snowflake_engineers);
    




    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $snowflake_engineers);    
    $response = inject_global_seo_data($response, $snowflake_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($snowflake_engineers);
    $response['schema'] = get_page_schema($snowflake_engineers);
    $response = decode_entities_deep($response); 
    $final_snowflake_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_snowflake_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_snowflake_engineers_response);
}




/**For AWS Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/aws-engineers', [
        'methods'  => 'GET',
        'callback' => 'aws_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function aws_sections_qubewp() {
    $cache_key = 'aws_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $aws_engineers=1427;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($aws_engineers);
    $response['page_title'] = get_the_title($aws_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $aws_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $aws_engineers);
    $response['build_a_secure_scalable_and_future_ready_with_aws_cloud_environment']=sdb_get_field('build_a_secure_scalable_and_future_ready_with_aws_cloud_environment','', $aws_engineers);
    $response['end_to_end_aws_consulting_services']=sdb_get_field('end_to_end_aws_consulting_services','', $aws_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $aws_engineers);
    $response['aws_security_governance_and_operational_excellence']=sdb_get_field('aws_security_governance_and_operational_excellence','', $aws_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $aws_engineers);    
    $response['cloud_solutions_that_support_your_business_as_it_grows']=sdb_get_field('cloud_solutions_that_support_your_business_as_it_grows','', $aws_engineers);    
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $aws_engineers);    
    $response['why_organizations_trust_code1_tech_systems']=sdb_get_field('why_organizations_trust_code1_tech_systems_aws','', $aws_engineers);    
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $aws_engineers);    
        

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $aws_engineers);    
    $response = inject_global_seo_data($response, $aws_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($aws_engineers);
    $response['schema'] = get_page_schema($aws_engineers);
    $response = decode_entities_deep($response); 
    $final_aws_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_aws_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_aws_engineers_response);
}



/**For Power Bi Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/power-bi-engineers', [
        'methods'  => 'GET',
        'callback' => 'power_bi_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function power_bi_sections_qubewp() {
    $cache_key = 'power_bi_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $power_bi_engineers=1436;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($power_bi_engineers);
    $response['page_title'] = get_the_title($power_bi_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $power_bi_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $power_bi_engineers);
    $response['turn_business_data_into_actionable_insights_with_microsoft_power_bi']=sdb_get_field('turn_business_data_into_actionable_insights_with_microsoft_power_bi','', $power_bi_engineers);
    $response['why_choose_power_bi_for_business_intelligence']=sdb_get_field('why_choose_power_bi_for_business_intelligence','', $power_bi_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $power_bi_engineers);
    $response['our_power_bi_development_services']=sdb_get_field('our_power_bi_development_services','', $power_bi_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $power_bi_engineers);
    $response['key_features_of_microsoft_power_bi']=sdb_get_field('key_features_of_microsoft_power_bi','', $power_bi_engineers);
    $response['benefits_of_choosing_power_bi']=sdb_get_field('benefits_of_choosing_power_bi','', $power_bi_engineers);
    $response['industries_we_serve']=sdb_get_field('industries_we_serve','', $power_bi_engineers);
    $response['our_power_bi_development_process']=sdb_get_field('our_power_bi_development_process','', $power_bi_engineers);
    $response['why_choose_code1_tech_systems']=sdb_get_field('why_choose_code1_tech_systems','', $power_bi_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $power_bi_engineers);    
    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $power_bi_engineers);    
    $response = inject_global_seo_data($response, $power_bi_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($power_bi_engineers);
    $response['schema'] = get_page_schema($power_bi_engineers);
    $response = decode_entities_deep($response); 
    $final_power_bi_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_power_bi_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_power_bi_engineers_response);
}




/**For Tableau Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/tableau-engineers', [
        'methods'  => 'GET',
        'callback' => 'tableau_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function tableau_sections_qubewp() {
    $cache_key = 'tableau_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $tableau_engineers=1477;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($tableau_engineers);
    $response['page_title'] = get_the_title($tableau_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $tableau_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $tableau_engineers);
    $response['transform_business_data_into_confident_decisions_with_tableau']=sdb_get_field('transform_business_data_into_confident_decisions_with_tableau','', $tableau_engineers);
    $response['turn_complex_data_into_actionable_business_intelligence']=sdb_get_field('turn_complex_data_into_actionable_business_intelligence','', $tableau_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $tableau_engineers);
    $response['why_choose_tableau_for_business_intelligence']=sdb_get_field('why_choose_tableau_for_business_intelligence','', $tableau_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $tableau_engineers);
    $response['why_businesses_trust_our_tableau_experts']=sdb_get_field('why_businesses_trust_our_tableau_experts','', $tableau_engineers);
    $response['tableau_development_services_designed_around_your_business']=sdb_get_field('tableau_development_services_designed_around_your_business','', $tableau_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $tableau_engineers);
    $response['partner_with_tableau_experts_who_understand_your_business']=sdb_get_field('partner_with_tableau_experts_who_understand_your_business','', $tableau_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $tableau_engineers);
    $response['popular_tableau_integrations']=sdb_get_field('popular_tableau_integrations','', $tableau_engineers);
    $response['our_tableau_development_process']=sdb_get_field('our_tableau_development_process','', $tableau_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $tableau_engineers);
    $response['tableau_solutions_for_every_industry']=sdb_get_field('tableau_solutions_for_every_industry','', $tableau_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $tableau_engineers);


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $tableau_engineers);    
    $response = inject_global_seo_data($response, $tableau_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($tableau_engineers);
    $response['schema'] = get_page_schema($tableau_engineers);
    $response = decode_entities_deep($response); 
    $final_tableau_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_tableau_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_tableau_engineers_response);
}




/**For N8N Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/n8n-engineers', [
        'methods'  => 'GET',
        'callback' => 'n8n_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function n8n_sections_qubewp() {
    $cache_key = 'n8n_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $n8n_engineers=1483;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($n8n_engineers);
    $response['page_title'] = get_the_title($n8n_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $n8n_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $n8n_engineers);
    $response['enterprise_n8n_automation_that_helps_you_scale_faster']=sdb_get_field('enterprise_n8n_automation_that_helps_you_scale_faster','', $n8n_engineers);
    $response['why_choose_n8n_for_business_automation']=sdb_get_field('why_choose_n8n_for_business_automation','', $n8n_engineers);    
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $n8n_engineers);    
    $response['what_can_you_automate_with_n8n']=sdb_get_field('what_can_you_automate_with_n8n','', $n8n_engineers);    
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $n8n_engineers);    
    $response['why_choose_code1_tech_systems_for_n8n_development']=sdb_get_field('why_choose_code1_tech_systems_for_n8n_development','', $n8n_engineers);    
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $n8n_engineers);    
    $response['our_n8n_development_process']=sdb_get_field('our_n8n_development_process','', $n8n_engineers);    
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $n8n_engineers);    
    $response['industries_we_help_automate']=sdb_get_field('industries_we_help_automate','', $n8n_engineers);    
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $n8n_engineers);              
    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $n8n_engineers);    
    $response = inject_global_seo_data($response, $n8n_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($n8n_engineers);
    $response['schema'] = get_page_schema($n8n_engineers);
    $response = decode_entities_deep($response); 
    $final_n8n_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_n8n_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_n8n_engineers_response);
}



/**For Oracle Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/oracle-engineers', [
        'methods'  => 'GET',
        'callback' => 'oracle_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function oracle_sections_qubewp() {
    $cache_key = 'oracle_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $oracle_engineers=1495;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($oracle_engineers);
    $response['page_title'] = get_the_title($oracle_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $oracle_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $oracle_engineers);
    $response['modernize_your_enterprise_with_expert_oracle_consulting_services']=sdb_get_field('modernize_your_enterprise_with_expert_oracle_consulting_services','', $oracle_engineers);
    $response['build_a_smarter_more_connected_oracle_environment']=sdb_get_field('build_a_smarter_more_connected_oracle_environment','', $oracle_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $oracle_engineers);
    $response['why_choose_oracle_for_enterprise_business_solutions']=sdb_get_field('why_choose_oracle_for_enterprise_business_solutions','', $oracle_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $oracle_engineers);
    $response['oracle_consulting_services_designed_around_your_business']=sdb_get_field('oracle_consulting_services_designed_around_your_business','', $oracle_engineers);
    $response['follow_a_proven_oracle_consulting_process']=sdb_get_field('follow_a_proven_oracle_consulting_process','', $oracle_engineers);
    $response['achieve_measurable_business_outcomes_with_oracle']=sdb_get_field('achieve_measurable_business_outcomes_with_oracle','', $oracle_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $oracle_engineers);
    $response['oracle_technologies_we_support']=sdb_get_field('oracle_technologies_we_support','', $oracle_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $oracle_engineers);
    $response['choose_an_oracle_consulting_partner_focused_on_your_success']=sdb_get_field('choose_an_oracle_consulting_partner_focused_on_your_success','', $oracle_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $oracle_engineers);
                    
    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $oracle_engineers);    
    $response = inject_global_seo_data($response, $oracle_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($oracle_engineers);
    $response['schema'] = get_page_schema($oracle_engineers);
    $response = decode_entities_deep($response); 
    $final_oracle_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_oracle_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_oracle_engineers_response);
}



/**For Microsoft Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/microsoft-engineers', [
        'methods'  => 'GET',
        'callback' => 'microsoft_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function microsoft_sections_qubewp() {
    $cache_key = 'microsoft_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $microsoft_engineers=1497;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($microsoft_engineers);
    $response['page_title'] = get_the_title($microsoft_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $microsoft_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $microsoft_engineers);
    $response['transform_your_business_with_expert_microsoft_consulting_services']=sdb_get_field('transform_your_business_with_expert_microsoft_consulting_services','', $microsoft_engineers);
    $response['microsoft_consulting_services_tailored_to_your_business']=sdb_get_field('microsoft_consulting_services_tailored_to_your_business','', $microsoft_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $microsoft_engineers);    
    $response['why_choose_microsoft_for_enterprise_technology']=sdb_get_field('why_choose_microsoft_for_enterprise_technology','', $microsoft_engineers);    
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $microsoft_engineers);    
    $response['our_microsoft_consulting_process']=sdb_get_field('our_microsoft_consulting_process','', $microsoft_engineers);    
    $response['drive_measurable_business_outcomes_with_microsoft_solutions']=sdb_get_field('drive_measurable_business_outcomes_with_microsoft_solutions','', $microsoft_engineers);    
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $microsoft_engineers);    
    $response['microsoft_technologies_we_support']=sdb_get_field('microsoft_technologies_we_support','', $microsoft_engineers);    
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $microsoft_engineers);                
    $response['industries_we_serve']=sdb_get_field('industries_we_serve','', $microsoft_engineers);                
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $microsoft_engineers);                    
    $response['why_choose_code1_tech_systems_for_microsoft_consulting']=sdb_get_field('why_choose_code1_tech_systems_for_microsoft_consulting','', $microsoft_engineers);                    
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $microsoft_engineers);                    
    

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $microsoft_engineers);    
    $response = inject_global_seo_data($response, $microsoft_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($microsoft_engineers);
    $response['schema'] = get_page_schema($microsoft_engineers);
    $response = decode_entities_deep($response); 
    $final_microsoft_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_microsoft_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_microsoft_engineers_response);
}





/**For Azure Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/azure-engineers', [
        'methods'  => 'GET',
        'callback' => 'azure_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function azure_sections_qubewp() {
    $cache_key = 'azure_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $azure_engineers=1517;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($azure_engineers);
    $response['page_title'] = get_the_title($azure_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $azure_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $azure_engineers);
    $response['microsoft_azure_expert_consulting_services']=sdb_get_field('microsoft_azure_expert_consulting_services','', $azure_engineers);
    $response['business_outcomes_that_drive_long_term_growth']=sdb_get_field('business_outcomes_that_drive_long_term_growth','', $azure_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $azure_engineers);
    $response['build_a_secure_and_scalable_azure_cloud_environment']=sdb_get_field('build_a_secure_and_scalable_azure_cloud_environment','', $azure_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $azure_engineers);
    $response['our_microsoft_azure_consulting_services']=sdb_get_field('our_microsoft_azure_consulting_services','', $azure_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $azure_engineers);
    $response['our_azure_consulting_process']=sdb_get_field('our_azure_consulting_process','', $azure_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $azure_engineers);
    $response['azure_technologies_we_support']=sdb_get_field('azure_technologies_we_support','', $azure_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $azure_engineers);
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $azure_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $azure_engineers);
    

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $azure_engineers);    
    $response = inject_global_seo_data($response, $azure_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($azure_engineers);
    $response['schema'] = get_page_schema($azure_engineers);
    $response = decode_entities_deep($response); 
    $final_azure_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_azure_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_azure_engineers_response);
}




/**For PowerApps Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/powerapps-engineers', [
        'methods'  => 'GET',
        'callback' => 'powerapps_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function powerapps_sections_qubewp() {
    $cache_key = 'powerapps_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $powerapps_engineers=1550;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($powerapps_engineers);
    $response['page_title'] = get_the_title($powerapps_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $powerapps_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $powerapps_engineers);
    $response['power_apps_development_turn_business_challenges_into_custom_applications']=sdb_get_field('power_apps_development_turn_business_challenges_into_custom_applications','', $powerapps_engineers);
    $response['every_business_deserves_applications_built_around_its_processes']=sdb_get_field('every_business_deserves_applications_built_around_its_processes','', $powerapps_engineers);
    $response['why_businesses_invest_in_power_apps']=sdb_get_field('why_businesses_invest_in_power_apps','', $powerapps_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $powerapps_engineers);
    $response['our_power_apps_development_services']=sdb_get_field('our_power_apps_development_services','', $powerapps_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $powerapps_engineers);
    $response['the_process_of_developing_power_apps']=sdb_get_field('the_process_of_developing_power_apps','', $powerapps_engineers);
    $response['microsoft_technologies_we_integrate_with']=sdb_get_field('microsoft_technologies_we_integrate_with','', $powerapps_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $powerapps_engineers);
    $response['industries_we_empower']=sdb_get_field('industries_we_empower','', $powerapps_engineers);
    $response['why_choose_code1_tech_systems']=sdb_get_field('why_choose_code1_tech_systems','', $powerapps_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $powerapps_engineers);


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $powerapps_engineers);    
    $response = inject_global_seo_data($response, $powerapps_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($powerapps_engineers);
    $response['schema'] = get_page_schema($powerapps_engineers);
    $response = decode_entities_deep($response); 
    $final_powerapps_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_powerapps_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_powerapps_engineers_response);
}




/**For D365 Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/d365-engineers', [
        'methods'  => 'GET',
        'callback' => 'd365_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function d365_sections_qubewp() {
    $cache_key = 'd365_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $d365_engineers=1552;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($d365_engineers);
    $response['page_title'] = get_the_title($d365_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $d365_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $d365_engineers);
    $response['advanced_business_operations_with_microsoft_dynamics_365_consulting_services']=sdb_get_field('advanced_business_operations_with_microsoft_dynamics_365_consulting_services','', $d365_engineers);
    $response['build_a_connected_business_with_microsoft_dynamics_365']=sdb_get_field('build_a_connected_business_with_microsoft_dynamics_365','', $d365_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $d365_engineers);
    $response['our_microsoft_dynamics_365_consulting_services']=sdb_get_field('our_microsoft_dynamics_365_consulting_services','', $d365_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $d365_engineers);
    $response['why_choose_microsoft_dynamics_365_for_your_business']=sdb_get_field('why_choose_microsoft_dynamics_365_for_your_business','', $d365_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $d365_engineers);
    $response['our_dynamics_365_consulting_process']=sdb_get_field('our_dynamics_365_consulting_process','', $d365_engineers);
    $response['microsoft_technologies_we_integrate_with_new']=sdb_get_field('microsoft_technologies_we_integrate_with_new','', $d365_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $d365_engineers);
    $response['industries_we_empower']=sdb_get_field('industries_we_empower','', $d365_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $d365_engineers);
    $response['why_choose_code1_tech_systems_for_dynamics_365_consulting']=sdb_get_field('why_choose_code1_tech_systems_for_dynamics_365_consulting','', $d365_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $d365_engineers);



    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $d365_engineers);    
    $response = inject_global_seo_data($response, $d365_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($d365_engineers);
    $response['schema'] = get_page_schema($d365_engineers);
    $response = decode_entities_deep($response); 
    $final_d365_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_d365_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_d365_engineers_response);
}



/**For Fintech Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/fintech-engineers', [
        'methods'  => 'GET',
        'callback' => 'fintech_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function fintech_sections_qubewp() {
    $cache_key = 'fintech_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $fintech_engineers=1599;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($fintech_engineers);
    $response['page_title'] = get_the_title($fintech_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $fintech_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $fintech_engineers);
    $response['our_core_fintech_principles']=sdb_get_field('our_core_fintech_principles','', $fintech_engineers);
    $response['fintech_solutions_we_deliver']=sdb_get_field('fintech_solutions_we_deliver','', $fintech_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $fintech_engineers);
    $response['our_consulting_development_process']=sdb_get_field('our_consulting_development_process','', $fintech_engineers);
    $response['technologies_that_power_your_fintech_business']=sdb_get_field('technologies_that_power_your_fintech_business','', $fintech_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $fintech_engineers);
    $response['flexible_engagement_models']=sdb_get_field('flexible_engagement_models','', $fintech_engineers);
    $response['business_outcomes_that_strengthen_financial_performance_and_customer_trust']=sdb_get_field('business_outcomes_that_strengthen_financial_performance_and_customer_trust','', $fintech_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $fintech_engineers);
    $response['transform_financial_innovation_into_business_growth']=sdb_get_field('transform_financial_innovation_into_business_growth','', $fintech_engineers);
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $fintech_engineers);

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $fintech_engineers);    
    $response = inject_global_seo_data($response, $fintech_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($fintech_engineers);
    $response['schema'] = get_page_schema($fintech_engineers);
    $response = decode_entities_deep($response); 
    $final_fintect_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_fintect_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_fintect_engineers_response);
}





/**For Banking Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/banking-engineers', [
        'methods'  => 'GET',
        'callback' => 'banking_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function banking_sections_qubewp() {
    $cache_key = 'banking_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $banking_engineers=1612;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($banking_engineers);
    $response['page_title'] = get_the_title($banking_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $banking_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $banking_engineers);
    $response['modern_banking_demands_smarter_digital_experiences']=sdb_get_field('modern_banking_demands_smarter_digital_experiences','', $banking_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $banking_engineers);
    $response['banking_solutions_we_deliver']=sdb_get_field('banking_solutions_we_deliver','', $banking_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $banking_engineers);
    $response['which_cutting_edge_technologies_power_today_s_modern_banking']=sdb_get_field('which_cutting_edge_technologies_power_today_s_modern_banking','', $banking_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $banking_engineers);
    $response['business_outcomes_that_strengthen_banking_performance']=sdb_get_field('business_outcomes_that_strengthen_banking_performance','', $banking_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $banking_engineers);
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $banking_engineers);
            

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $banking_engineers);    
    $response = inject_global_seo_data($response, $banking_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($banking_engineers);
    $response['schema'] = get_page_schema($banking_engineers);
    $response = decode_entities_deep($response); 
    $final_fintect_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_fintect_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_fintect_engineers_response);
}




/**For Healthcare Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/healthcare-engineers', [
        'methods'  => 'GET',
        'callback' => 'healthcare_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function healthcare_sections_qubewp() {
    $cache_key = 'healthcare_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $healthcare_engineers=1626;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($healthcare_engineers);
    $response['page_title'] = get_the_title($healthcare_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $healthcare_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $healthcare_engineers);
    $response['how_healthcare_organizations_benefit_from_advanced_solutions']=sdb_get_field('how_healthcare_organizations_benefit_from_advanced_solutions','', $healthcare_engineers);
    $response['healthcare_solutions_we_deliver']=sdb_get_field('healthcare_solutions_we_deliver','', $healthcare_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $healthcare_engineers);
    $response['technologies_that_power_connected_healthcare']=sdb_get_field('technologies_that_power_connected_healthcare','', $healthcare_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $healthcare_engineers);
    $response['business_outcomes_that_improve_patient_care']=sdb_get_field('business_outcomes_that_improve_patient_care','', $healthcare_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $healthcare_engineers);
    $response['our_healthcare_development_workflow']=sdb_get_field('our_healthcare_development_workflow','', $healthcare_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $healthcare_engineers);
    $response['flexible_engagement_models']=sdb_get_field('flexible_engagement_models','', $healthcare_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $healthcare_engineers);
    $response['reasons_why_healthcare_institutions_opt_for_code1_technologies']=sdb_get_field('reasons_why_healthcare_institutions_opt_for_code1_technologies','', $healthcare_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $healthcare_engineers);
    $response['cta_section_131']=sdb_get_field('cta_section_131','', $healthcare_engineers);
    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $healthcare_engineers);    
    $response = inject_global_seo_data($response, $healthcare_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($healthcare_engineers);
    $response['schema'] = get_page_schema($healthcare_engineers);
    $response = decode_entities_deep($response); 
    $final_healthcare_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_healthcare_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_healthcare_engineers_response);
}






/**For Retail Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/retail-engineers', [
        'methods'  => 'GET',
        'callback' => 'retail_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function retail_sections_qubewp() {
    $cache_key = 'retail_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $retail_engineers=1646;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($retail_engineers);
    $response['page_title'] = get_the_title($retail_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $retail_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $retail_engineers);
    $response['build_smarter_digital_commerce_experiences']=sdb_get_field('build_smarter_digital_commerce_experiences','', $retail_engineers);
    $response['ecommerce_solutions_we_deliver']=sdb_get_field('ecommerce_solutions_we_deliver','', $retail_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $retail_engineers);
    $response['technologies_integrations_that_power_digital_commerce']=sdb_get_field('technologies_integrations_that_power_digital_commerce','', $retail_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $retail_engineers);
    $response['business_outcomes_that_increase_revenue_and_customer_loyalty']=sdb_get_field('business_outcomes_that_increase_revenue_and_customer_loyalty','', $retail_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $retail_engineers);            
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $retail_engineers);            
    $response['turning_your_online_shopping_into_business_growth']=sdb_get_field('turning_your_online_shopping_into_business_growth','', $retail_engineers);            





    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $retail_engineers);    
    $response = inject_global_seo_data($response, $retail_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($retail_engineers);
    $response['schema'] = get_page_schema($retail_engineers);
    $response = decode_entities_deep($response); 
    $final_retail_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_retail_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_retail_engineers_response);
}






/**For Real Estate Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/real-estate-engineers', [
        'methods'  => 'GET',
        'callback' => 'real_estate_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function real_estate_sections_qubewp() {
    $cache_key = 'real_estate_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $real_estate_engineers=1660;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($real_estate_engineers);
    $response['page_title'] = get_the_title($real_estate_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $real_estate_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $real_estate_engineers);
    $response['key_challenges_in_real_estate_operations']=sdb_get_field('key_challenges_in_real_estate_operations','', $real_estate_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $real_estate_engineers);
    $response['real_estate_software_solutions_we_deliver']=sdb_get_field('real_estate_software_solutions_we_deliver','', $real_estate_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $real_estate_engineers);
    $response['technologies_that_power_modern_real_estate']=sdb_get_field('technologies_that_power_modern_real_estate','', $real_estate_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $real_estate_engineers);
    $response['business_outcomes_that_drive_real_estate_growth']=sdb_get_field('business_outcomes_that_drive_real_estate_growth','', $real_estate_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $real_estate_engineers);
    $response['our_consulting_development_process']=sdb_get_field('our_consulting_development_process','', $real_estate_engineers);
    $response['industries_we_serve_within_real_estate']=sdb_get_field('industries_we_serve_within_real_estate','', $real_estate_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $real_estate_engineers);
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $real_estate_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $real_estate_engineers);
    $response['flexible_engagement_models']=sdb_get_field('flexible_engagement_models','', $real_estate_engineers);
    $response['turning_real_estate_operations_into_sustainable_growth']=sdb_get_field('turning_real_estate_operations_into_sustainable_growth','', $real_estate_engineers);
        
    





    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $real_estate_engineers);    
    $response = inject_global_seo_data($response, $real_estate_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($real_estate_engineers);
    $response['schema'] = get_page_schema($real_estate_engineers);
    $response = decode_entities_deep($response); 
    $final_real_estate_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_real_estate_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_real_estate_engineers_response);
}








/**For Travel Hospitality Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/travel-engineers', [
        'methods'  => 'GET',
        'callback' => 'travel_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function travel_sections_qubewp() {
    $cache_key = 'travel_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $travel_engineers=1671;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($travel_engineers);
    $response['page_title'] = get_the_title($travel_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $travel_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $travel_engineers);
    $response['build_exceptional_travel_hospitality_experiences_through_digital_innovation']=sdb_get_field('build_exceptional_travel_hospitality_experiences_through_digital_innovation','', $travel_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $travel_engineers);
    $response['travel_hospitality_solutions_we_deliver']=sdb_get_field('travel_hospitality_solutions_we_deliver','', $travel_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $travel_engineers);
    $response['technologies_that_power_modern_real_estate']=sdb_get_field('technologies_that_power_modern_real_estate','', $travel_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $travel_engineers);
    $response['business_outcomes_that_drive_real_estate_growth']=sdb_get_field('business_outcomes_that_drive_real_estate_growth','', $travel_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $travel_engineers);
    $response['our_consulting_development_process']=sdb_get_field('our_consulting_development_process','', $travel_engineers);
    $response['industries_we_serve_within_real_estate']=sdb_get_field('industries_we_serve_within_real_estate','', $travel_engineers);
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $travel_engineers);
    $response['flexible_engagement_models']=sdb_get_field('flexible_engagement_models','', $travel_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $travel_engineers);
    $response['build_the_future_of_travel_with_confidence']=sdb_get_field('build_the_future_of_travel_with_confidence','', $travel_engineers);
          



    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $travel_engineers);    
    $response = inject_global_seo_data($response, $travel_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($travel_engineers);
    $response['schema'] = get_page_schema($travel_engineers);
    $response = decode_entities_deep($response); 
    $final_travel_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_travel_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_travel_engineers_response);
}











/**For Professional Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/professional-engineers', [
        'methods'  => 'GET',
        'callback' => 'professional_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function professional_sections_qubewp() {
    $cache_key = 'professional_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $professional_engineers=1682;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($professional_engineers);
    $response['page_title'] = get_the_title($professional_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $professional_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $professional_engineers);
    $response['build_smarter_saas_products_through_digital_innovation']=sdb_get_field('build_smarter_saas_products_through_digital_innovation','', $professional_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $professional_engineers);
    $response['build_secure_scalable_saas_solutions']=sdb_get_field('build_secure_scalable_saas_solutions','', $professional_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $professional_engineers);
    $response['technologies_that_power_modern_real_estate']=sdb_get_field('technologies_that_power_modern_real_estate','', $professional_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $professional_engineers);
    $response['business_outcomes_that_drive_real_estate_growth']=sdb_get_field('business_outcomes_that_drive_real_estate_growth','', $professional_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $professional_engineers);
    $response['industries_we_support']=sdb_get_field('industries_we_support','', $professional_engineers);
    $response['our_consulting_development_process']=sdb_get_field('our_consulting_development_process','', $professional_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $professional_engineers);
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $professional_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $professional_engineers);
    $response['flexible_engagement_models']=sdb_get_field('flexible_engagement_models','', $professional_engineers);
    $response['cta_section_131']=sdb_get_field('cta_section_131','', $professional_engineers);
    
    $response['turning_ideas_into_scalable_saas_success']=sdb_get_field('turning_ideas_into_scalable_saas_success','', $professional_engineers);
     



    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $professional_engineers);    
    $response = inject_global_seo_data($response, $professional_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($professional_engineers);
    $response['schema'] = get_page_schema($professional_engineers);
    $response = decode_entities_deep($response); 
    $final_professional_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_professional_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_professional_engineers_response);
}






/**For Education Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/education-engineers', [
        'methods'  => 'GET',
        'callback' => 'education_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function education_sections_qubewp() {
    $cache_key = 'education_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $education_engineers=1700;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($education_engineers);
    $response['page_title'] = get_the_title($education_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $education_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $education_engineers);




    $response['why_education_technology_continues_to_transform_learning']=sdb_get_field('why_education_technology_continues_to_transform_learning','', $education_engineers);

    $response['cta_section_70']=sdb_get_field('cta_section_70','', $education_engineers);


    $response['our_education_edtech_software_services']=sdb_get_field('our_education_edtech_software_services','', $education_engineers);


    $response['cta_section_77']=sdb_get_field('cta_section_77','', $education_engineers);


    $response['technologies_that_power_modern_real_estate']=sdb_get_field('technologies_that_power_modern_real_estate','', $education_engineers);

    $response['cta_section_111']=sdb_get_field('cta_section_111','', $education_engineers);


    $response['business_outcomes_that_drive_real_estate_growth']=sdb_get_field('business_outcomes_that_drive_real_estate_growth','', $education_engineers);


    $response['cta_section_113']=sdb_get_field('cta_section_113','', $education_engineers);

    $response['industries_we_support']=sdb_get_field('industries_we_support','', $education_engineers);
    $response['why_choose_code1_tech_systems_for_industry_solutions']=sdb_get_field('why_choose_code1_tech_systems_for_industry_solutions','', $education_engineers);

    $response['cta_section_114']=sdb_get_field('cta_section_114','', $education_engineers);

    
    $response['build_future_ready_education_software_with_code1_tech']=sdb_get_field('build_future_ready_education_software_with_code1_tech','', $education_engineers);
     


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $education_engineers);    
    $response = inject_global_seo_data($response, $education_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($education_engineers);
    $response['schema'] = get_page_schema($education_engineers);
    $response = decode_entities_deep($response); 
    $final_education_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_education_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_education_engineers_response);
}





/**For GCP Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/gcp-engineers', [
        'methods'  => 'GET',
        'callback' => 'gcp_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function gcp_sections_qubewp() {
    $cache_key = 'gcp_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $gcp_engineers=1713;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($gcp_engineers);
    $response['page_title'] = get_the_title($gcp_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $gcp_engineers)
    );
    $response['tools_main_banner']=sdb_get_field('tools_main_banner','', $gcp_engineers);
    $response['google_cloud_consulting_services_for_profitable_cloud_investment']=sdb_get_field('google_cloud_consulting_services_for_profitable_cloud_investment','', $gcp_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $gcp_engineers);
    $response['why_choose_google_cloud_platform_for_your_business']=sdb_get_field('why_choose_google_cloud_platform_for_your_business','', $gcp_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $gcp_engineers);
    $response['our_google_cloud_consulting_services']=sdb_get_field('our_google_cloud_consulting_services','', $gcp_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $gcp_engineers);
    $response['google_cloud_technologies_we_work_with']=sdb_get_field('google_cloud_technologies_we_work_with','', $gcp_engineers);
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $gcp_engineers);
    $response['industries_we_serve_gcp']=sdb_get_field('industries_we_serve_gcp','', $gcp_engineers);
    $response['why_choose_code1_tech_systems_for_google_cloud_consulting']=sdb_get_field('why_choose_code1_tech_systems_for_google_cloud_consulting','', $gcp_engineers);
    $response['business_outcomes_you_can_expect']=sdb_get_field('business_outcomes_you_can_expect','', $gcp_engineers);

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $gcp_engineers);    
    $response = inject_global_seo_data($response, $gcp_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($gcp_engineers);
    $response['schema'] = get_page_schema($gcp_engineers);
    $response = decode_entities_deep($response); 
    $final_gcp_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_gcp_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_gcp_engineers_response);
}






/**For insurtech Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/insurtech-engineers', [
        'methods'  => 'GET',
        'callback' => 'insurtech_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function insurtech_sections_qubewp() {
    $cache_key = 'insurtech_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $insurtech_engineers=1849;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($insurtech_engineers);
    $response['page_title'] = get_the_title($insurtech_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $insurtech_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $insurtech_engineers);
    $response['business_outcomes_that_drive_real_estate_growth']=sdb_get_field('business_outcomes_that_drive_real_estate_growth','', $insurtech_engineers);
    $response['our_services_industries']=sdb_get_field('our_services_industries','', $insurtech_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $insurtech_engineers);
    
    $response['build_secure_scalable_saas_solutions']=sdb_get_field('build_secure_scalable_saas_solutions','', $insurtech_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $insurtech_engineers);
    $response['business_challenges_industries']=sdb_get_field('business_challenges_industries','', $insurtech_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $insurtech_engineers);    
    $response['industries_we_serve_within_real_estate']=sdb_get_field('industries_we_serve_within_real_estate','', $insurtech_engineers);    
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $insurtech_engineers);
    $response['industry_technology_cards']=sdb_get_field('industry_technology_cards','', $insurtech_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $insurtech_engineers);
    $response['flexible_industry_cards']=sdb_get_field('flexible_industry_cards','', $insurtech_engineers);
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $insurtech_engineers);    
    $response['why_choose_industry_image_and_content']=sdb_get_field('why_choose_industry_image_and_content','', $insurtech_engineers);    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $insurtech_engineers);    
    $response = inject_global_seo_data($response, $insurtech_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($insurtech_engineers);
    $response['schema'] = get_page_schema($insurtech_engineers);
    $response = decode_entities_deep($response); 
    $final_insurtech_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_insurtech_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_insurtech_engineers_response);
}





/**For Manufacturing Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/manufacturing-engineers', [
        'methods'  => 'GET',
        'callback' => 'manufacturing_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function manufacturing_sections_qubewp() {
    $cache_key = 'manufacturing_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $manufacturing_engineers=1883;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($manufacturing_engineers);
    $response['page_title'] = get_the_title($manufacturing_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $manufacturing_engineers)
    );
    $response['industries_banner']=sdb_get_field('industries_banner','', $manufacturing_engineers);
    $response['business_outcomes_that_drive_real_estate_growth']=sdb_get_field('business_outcomes_that_drive_real_estate_growth','', $manufacturing_engineers);
    $response['cta_section_70']=sdb_get_field('cta_section_70','', $manufacturing_engineers);


    $response['our_services_industries']=sdb_get_field('our_services_industries','', $manufacturing_engineers);
    $response['cta_section_77']=sdb_get_field('cta_section_77','', $manufacturing_engineers);
    $response['build_secure_scalable_saas_solutions']=sdb_get_field('build_secure_scalable_saas_solutions','', $manufacturing_engineers);
    $response['cta_section_111']=sdb_get_field('cta_section_111','', $manufacturing_engineers);    
    $response['manufacturing_solutions_we_build']=sdb_get_field('manufacturing_solutions_we_build','', $manufacturing_engineers);    
    $response['cta_section_113']=sdb_get_field('cta_section_113','', $manufacturing_engineers);    
    $response['business_challenges_industries']=sdb_get_field('business_challenges_industries','', $manufacturing_engineers);
    $response['cta_section_114']=sdb_get_field('cta_section_114','', $manufacturing_engineers);

    $response['industries_we_serve_within_real_estate']=sdb_get_field('industries_we_serve_within_real_estate','', $manufacturing_engineers);    
    $response['cta_section_130']=sdb_get_field('cta_section_130','', $manufacturing_engineers);    


    $response['industry_technology_cards']=sdb_get_field('industry_technology_cards','', $manufacturing_engineers);
    $response['cta_section_131']=sdb_get_field('cta_section_131','', $manufacturing_engineers);    
    $response['why_choose_code1_tech_systems_manufacturing']=sdb_get_field('why_choose_code1_tech_systems_manufacturing','', $manufacturing_engineers);        
    $response['cta_section_133']=sdb_get_field('cta_section_133','', $manufacturing_engineers);        
    $response['build_smarter_manufacturing_operations_with_code1_tech_systems']=sdb_get_field('build_smarter_manufacturing_operations_with_code1_tech_systems','', $manufacturing_engineers);        
    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $manufacturing_engineers);    
    $response = inject_global_seo_data($response, $manufacturing_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($manufacturing_engineers);
    $response['schema'] = get_page_schema($manufacturing_engineers);
    $response = decode_entities_deep($response); 
    $final_manufacturing_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_manufacturing_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_manufacturing_engineers_response);
}




/**For Modal Fine Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/modal-fine-engineers', [
        'methods'  => 'GET',
        'callback' => 'modal_fine_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function modal_fine_sections_qubewp() {
    $cache_key = 'modal_fine_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $modal_fine_engineers=1745;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($modal_fine_engineers);
    $response['page_title'] = get_the_title($modal_fine_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $modal_fine_engineers)
    );
    $response['ai_ml_banner_section']=sdb_get_field('ai_ml_banner_section','', $modal_fine_engineers);    
    $response['section_below_banner']=sdb_get_field('section_below_banner','', $modal_fine_engineers);    
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $modal_fine_engineers);    
    $response['our_ai_model_fine_tuning_services']=sdb_get_field('our_ai_model_fine_tuning_services','', $modal_fine_engineers);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $modal_fine_engineers);    
    $response['ai_cards_image_section']=sdb_get_field('ai_cards_image_section','', $modal_fine_engineers);    
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $modal_fine_engineers);    
    $response['ai_challenges_section']=sdb_get_field('ai_challenges_section','', $modal_fine_engineers);    
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $modal_fine_engineers);    
    $response['ai_industries_section']=sdb_get_field('ai_industries_section','', $modal_fine_engineers);    
    $response['cta_section_320']=sdb_get_field('cta_section_320','', $modal_fine_engineers);    
    $response['ai_technologies_section']=sdb_get_field('ai_technologies_section','', $modal_fine_engineers);    
    $response['cta_section_322']=sdb_get_field('cta_section_322','', $modal_fine_engineers);    
    $response['ai_cards_section']=sdb_get_field('ai_cards_section','', $modal_fine_engineers);    
    $response['cta_section_324']=sdb_get_field('cta_section_324','', $modal_fine_engineers);                        
    $response['ai_why_what_code1tech_section']=sdb_get_field('ai_why_what_code1tech_section','', $modal_fine_engineers);                        
    



    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $modal_fine_engineers);    
    $response = inject_global_seo_data($response, $modal_fine_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($modal_fine_engineers);
    $response['schema'] = get_page_schema($modal_fine_engineers);
    $response = decode_entities_deep($response); 
    $final_modal_fine_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_modal_fine_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_modal_fine_engineers_response);
}





/**For Computer Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/computer-engineers', [
        'methods'  => 'GET',
        'callback' => 'computer_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function computer_sections_qubewp() {
    $cache_key = 'computer_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $computer_engineers=1747;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($computer_engineers);
    $response['page_title'] = get_the_title($computer_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $computer_engineers)
    );
    $response['ai_ml_banner_section']=sdb_get_field('ai_ml_banner_section','', $computer_engineers);    
    $response['section_below_banner']=sdb_get_field('section_below_banner','', $computer_engineers);    
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $computer_engineers);    
    $response['ai_cards_section']=sdb_get_field('ai_cards_section','', $computer_engineers);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $computer_engineers);      
    $response['ai_challenges_section']=sdb_get_field('ai_challenges_section','', $computer_engineers);    
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $computer_engineers);       
    $response['our_ai_model_fine_tuning_services']=sdb_get_field('our_ai_model_fine_tuning_services','', $computer_engineers);    
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $computer_engineers);    
    $response['ai_industries_section']=sdb_get_field('ai_industries_section','', $computer_engineers);    
    $response['cta_section_320']=sdb_get_field('cta_section_320','', $computer_engineers);    
    $response['ai_why_what_code1tech_section']=sdb_get_field('ai_why_what_code1tech_section','', $computer_engineers);                        
    $response['cta_section_322']=sdb_get_field('cta_section_322','', $computer_engineers);    
    $response['business_outcomes_you_can_expect_from_industrial_computer_vision_solutions']=sdb_get_field('business_outcomes_you_can_expect_from_industrial_computer_vision_solutions','', $computer_engineers);    
    $response['cta_section_324']=sdb_get_field('cta_section_324','', $computer_engineers);                        
    $response['ai_technologies_section']=sdb_get_field('ai_technologies_section','', $computer_engineers);    
    $response['cta_section_327']=sdb_get_field('cta_section_327','', $computer_engineers);                        

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $computer_engineers);    
    $response = inject_global_seo_data($response, $computer_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($computer_engineers);
    $response['schema'] = get_page_schema($computer_engineers);
    $response = decode_entities_deep($response); 
    $final_computer_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_computer_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_computer_engineers_response);
}




/**For Natural Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/natural-engineers', [
        'methods'  => 'GET',
        'callback' => 'natural_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function natural_sections_qubewp() {
    $cache_key = 'natural_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $natural_engineers=1762;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($natural_engineers);
    $response['page_title'] = get_the_title($natural_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $natural_engineers)
    );
    $response['ai_ml_banner_section']=sdb_get_field('ai_ml_banner_section','', $natural_engineers);    
    $response['section_below_banner']=sdb_get_field('section_below_banner','', $natural_engineers);    
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $natural_engineers);    
    $response['ai_cards_section']=sdb_get_field('ai_cards_section','', $natural_engineers);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $natural_engineers);      
    $response['our_natural_language_processing_services']=sdb_get_field('our_natural_language_processing_services','', $natural_engineers);      
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $natural_engineers);           
    $response['ai_industries_section']=sdb_get_field('ai_industries_section','', $natural_engineers);    
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $natural_engineers);    
    $response['ai_technologies_section']=sdb_get_field('ai_technologies_section','', $natural_engineers);    
    $response['cta_section_320']=sdb_get_field('cta_section_320','', $natural_engineers);      
    $response['business_outcomes_you_can_expect_from_industrial_computer_vision_solutions']=sdb_get_field('business_outcomes_you_can_expect_from_industrial_computer_vision_solutions','', $natural_engineers);    
    $response['cta_section_322']=sdb_get_field('cta_section_322','', $natural_engineers);    
    $response['ai_flexible_engagement_models']=sdb_get_field('ai_flexible_engagement_models','', $natural_engineers);    
    $response['cta_section_324']=sdb_get_field('cta_section_324','', $natural_engineers);                            
    $response['ai_why_what_code1tech_section']=sdb_get_field('ai_why_what_code1tech_section','', $natural_engineers);                        


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $natural_engineers);    
    $response = inject_global_seo_data($response, $natural_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($natural_engineers);
    $response['schema'] = get_page_schema($natural_engineers);
    $response = decode_entities_deep($response); 
    $final_natural_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_natural_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_natural_engineers_response);
}






/**For strategy Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/strategy-engineers', [
        'methods'  => 'GET',
        'callback' => 'strategy_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function strategy_sections_qubewp() {
    $cache_key = 'strategy_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $strategy_engineers=1777;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($strategy_engineers);
    $response['page_title'] = get_the_title($strategy_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $strategy_engineers)
    );
    $response['ai_ml_banner_section']=sdb_get_field('ai_ml_banner_section','', $strategy_engineers);    
    $response['section_below_banner']=sdb_get_field('section_below_banner','', $strategy_engineers);    
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $strategy_engineers);    
    $response['ai_cards_section']=sdb_get_field('ai_cards_section','', $strategy_engineers);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $strategy_engineers);      
    $response['ai_challenges_section']=sdb_get_field('ai_challenges_section','', $strategy_engineers);      
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $strategy_engineers);           
    $response['ai_industries_section']=sdb_get_field('ai_industries_section','', $strategy_engineers);    
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $strategy_engineers);        
    $response['our_natural_language_processing_services']=sdb_get_field('our_natural_language_processing_services','', $strategy_engineers);      
    $response['cta_section_320']=sdb_get_field('cta_section_320','', $strategy_engineers);      
    $response['ai_technologies_section']=sdb_get_field('ai_technologies_section','', $strategy_engineers);    
    $response['cta_section_322']=sdb_get_field('cta_section_322','', $strategy_engineers);    
    $response['business_outcomes_you_can_expect_from_industrial_computer_vision_solutions']=sdb_get_field('business_outcomes_you_can_expect_from_industrial_computer_vision_solutions','', $strategy_engineers);    
    $response['cta_section_324']=sdb_get_field('cta_section_324','', $strategy_engineers);                            
    $response['ai_why_what_code1tech_section']=sdb_get_field('ai_why_what_code1tech_section','', $strategy_engineers);                        

    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $strategy_engineers);    
    $response = inject_global_seo_data($response, $strategy_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($strategy_engineers);
    $response['schema'] = get_page_schema($strategy_engineers);
    $response = decode_entities_deep($response); 
    $final_strategy_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_strategy_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_strategy_engineers_response);
}






/**For Agents Engineers */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/agents-engineers', [
        'methods'  => 'GET',
        'callback' => 'agents_sections_qubewp',
        'permission_callback' => '__return_true'
    ]);

});

function agents_sections_qubewp() {
    $cache_key = 'agents_engineers_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $agents_engineers=1802;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($agents_engineers);
    $response['page_title'] = get_the_title($agents_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $agents_engineers)
    );
    $response['ai_ml_banner_section']=sdb_get_field('ai_ml_banner_section','', $agents_engineers);    
    $response['section_below_banner']=sdb_get_field('section_below_banner','', $agents_engineers);    
    $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $agents_engineers);    
    $response['our_ai_model_fine_tuning_services']=sdb_get_field('our_ai_model_fine_tuning_services','', $agents_engineers);    
    $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $agents_engineers);      
    $response['ai_challenges_section']=sdb_get_field('ai_challenges_section','', $agents_engineers);      
    $response['cta_section_104']=sdb_get_field('cta_section_104','', $agents_engineers);           
    $response['ai_technologies_section']=sdb_get_field('ai_technologies_section','', $agents_engineers);    
    $response['cta_section_106']=sdb_get_field('cta_section_106','', $agents_engineers);        
    $response['business_outcomes_you_can_expect_from_industrial_computer_vision_solutions']=sdb_get_field('business_outcomes_you_can_expect_from_industrial_computer_vision_solutions','', $agents_engineers);    
    $response['cta_section_320']=sdb_get_field('cta_section_320','', $agents_engineers);      
    $response['ai_why_what_code1tech_section']=sdb_get_field('ai_why_what_code1tech_section','', $agents_engineers);                        
    $response['cta_section_322']=sdb_get_field('cta_section_322','', $agents_engineers);    


    $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $agents_engineers);    
    $response = inject_global_seo_data($response, $agents_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($agents_engineers);
    $response['schema'] = get_page_schema($agents_engineers);
    $response = decode_entities_deep($response); 
    $final_agents_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_agents_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_agents_engineers_response);
}








/**For Mlops Engineers */
add_action('rest_api_init', function () {
  register_rest_route('v1', '/mlops-engineers', [
      'methods'  => 'GET',
      'callback' => 'mlops_sections_qubewp',
      'permission_callback' => '__return_true'
  ]);

});

function mlops_sections_qubewp() {
  $cache_key = 'mlops_engineers_api_cache';
  // Try getting cached data
  $cached = get_transient($cache_key);
  if ($cached !== false) {
      return rest_ensure_response($cached);
  }
  $mlops_engineers=1809;
  $response = [];
  //echo "scsdc";
  //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
  $response=get_fields($mlops_engineers);
  $response['page_title'] = get_the_title($mlops_engineers);
  $response['page_content'] = apply_filters(
      'the_content',
      get_post_field('post_content', $mlops_engineers)
  );
  $response['ai_ml_banner_section']=sdb_get_field('ai_ml_banner_section','', $mlops_engineers);    
  $response['section_below_banner']=sdb_get_field('section_below_banner','', $mlops_engineers);    
  $response['data_engineers_security_brief_cta']=sdb_get_field('data_engineers_security_brief_cta','', $mlops_engineers);    
  $response['our_ai_model_fine_tuning_services']=sdb_get_field('our_ai_model_fine_tuning_services','', $mlops_engineers);    
  $response['on_demand_cta']=sdb_get_field('on_demand_cta','', $mlops_engineers);      
  $response['ai_challenges_section']=sdb_get_field('ai_challenges_section','', $mlops_engineers);      
  $response['cta_section_104']=sdb_get_field('cta_section_104','', $mlops_engineers);           
  $response['ai_industries_section']=sdb_get_field('ai_industries_section','', $mlops_engineers);    
  $response['cta_section_106']=sdb_get_field('cta_section_106','', $mlops_engineers);        


  $response['business_outcomes_you_can_expect_from_industrial_computer_vision_solutions']=sdb_get_field('business_outcomes_you_can_expect_from_industrial_computer_vision_solutions','', $mlops_engineers);    
  $response['cta_section_320']=sdb_get_field('cta_section_320','', $mlops_engineers);      
  $response['ai_why_what_code1tech_section']=sdb_get_field('ai_why_what_code1tech_section','', $mlops_engineers);                        
  $response['cta_section_322']=sdb_get_field('cta_section_322','', $mlops_engineers);    


  $response['services_get_started_section']=sdb_get_field('services_get_started_section','', $mlops_engineers);    
  $response = inject_global_seo_data($response, $mlops_engineers);
  $response['seo']['canonical'] = get_headless_canonical_url($mlops_engineers);
  $response['schema'] = get_page_schema($mlops_engineers);
  $response = decode_entities_deep($response); 
  $final_mlops_engineers_response = [
      'status' => true,
      'data'   => $response
  ];
  // Cache the response for 1 hour
  set_transient($cache_key, $final_mlops_engineers_response, HOUR_IN_SECONDS);
  return rest_ensure_response($final_mlops_engineers_response);
}





/**For Case Studies */
add_action('rest_api_init', function () {
    register_rest_route('v1', '/case-studies', [
        'methods'  => 'GET',
        'callback' => 'case_studies_qubewp',
        'permission_callback' => '__return_true'
    ]);
  
  });
  
  function case_studies_qubewp() {
    $cache_key = 'case_studies_api_cache';
    // Try getting cached data
    $cached = get_transient($cache_key);
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }
    $case_studies_engineers=1920;
    $response = [];
    //echo "scsdc";
    //print_r(sdb_get_field('home_client_fields_1','client_logo_section', $homepage_id));
    $response=get_fields($case_studies_engineers);
    $response['page_title'] = get_the_title($case_studies_engineers);
    $response['page_content'] = apply_filters(
        'the_content',
        get_post_field('post_content', $case_studies_engineers)
    );
    $response['case_study_page']=sdb_get_field('case_study_page','', $case_studies_engineers);    
    $response = inject_global_seo_data($response, $case_studies_engineers);
    $response['seo']['canonical'] = get_headless_canonical_url($case_studies_engineers);
    $response['schema'] = get_page_schema($case_studies_engineers);
    $response = decode_entities_deep($response); 
    $final_mlops_engineers_response = [
        'status' => true,
        'data'   => $response
    ];
    // Cache the response for 1 hour
    set_transient($cache_key, $final_mlops_engineers_response, HOUR_IN_SECONDS);
    return rest_ensure_response($final_mlops_engineers_response);
  }




  /** Get All Case Studies */

add_action('rest_api_init', function () {
    register_rest_route('v1', '/casestudies', [
        'methods'  => 'GET',
        'callback' => 'custom_v1_get_casestudies',
        'permission_callback' => '__return_true'
    ]);
});

function custom_v1_get_casestudies($request) {

    $limit = intval($request->get_param('limit')) ?: -1;

    // Support both single and multiple category parameters
    $cat_slug = $request->get_param('category');

    if (is_array($cat_slug)) {
        $cat_slug = array_map('sanitize_text_field', $cat_slug);
        $cat_slug = array_filter($cat_slug);
    } elseif (!empty($cat_slug)) {
        $cat_slug = [sanitize_text_field($cat_slug)];
    } else {
        $cat_slug = [];
    }

    // Exclude by ID — accepts ?exclude=5 or ?exclude=5,8,12
    $exclude_param = $request->get_param('exclude');
    $exclude_ids = [713,712,711,273,272,271,255];

    if (is_array($exclude_param)) {
        $exclude_ids = array_map('absint', $exclude_param);
    } elseif (!empty($exclude_param)) {
        $exclude_ids = array_map('absint', explode(',', $exclude_param));
    }

    $exclude_ids = array_filter($exclude_ids);

    $args = [
        'post_type'      => 'case_studies',
        'posts_per_page' => $limit,
    ];

    if (!empty($exclude_ids)) {
        $args['post__not_in'] = $exclude_ids;
    }

    if (!empty($request->get_param('slug'))) {
        $args['post_status'] = ['publish', 'draft'];
    } else {
        $args['post_status'] = 'publish';
    }

    // Taxonomy slug filter
    if (!empty($cat_slug)) {

        $term_ids = [];

        foreach ($cat_slug as $slug) {
            $term = get_term_by('slug', $slug, 'case_study_category');

            if ($term) {
                $term_ids[] = $term->term_id;
            }
        }

        // If none of the supplied slugs are valid → no posts
        if (empty($term_ids)) {
            return rest_ensure_response([
                'status' => true,
                'count'  => 0,
                'data'   => []
            ]);
        }

        // Multiple terms = posts from any of these terms
        $args['tax_query'] = [
            [
                'taxonomy' => 'case_study_category',
                'field'    => 'term_id',
                'terms'    => $term_ids,
            ],
        ];
    }

    $query = new WP_Query($args);
    $casestudies = [];

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();

            $terms = get_the_terms(get_the_ID(), 'case_study_category');
            $categories = ($terms && !is_wp_error($terms))
                ? wp_list_pluck($terms, 'name')
                : [];
                $seo_response = [];
                $seo_response = inject_global_seo_data($seo_response, get_the_ID());
                $seo_response['seo']['canonical'] = get_headless_canonical_url(get_the_ID());
                $content_new = '';
                if(get_the_ID()=='2213')
                {
                $content_new = sdb_get_field('new_section_for_ai_powered_customer', '', get_the_ID());
                }
                if(get_the_ID()=='2184')
                {
                $content_new = sdb_get_field('specific_case_studies_section', '', get_the_ID());
                }
                if(get_the_ID()=='2035')
                {
                $content_new = sdb_get_field('new_section_for_retail_sales_inventory', '', get_the_ID());
                }
                if(get_the_ID()=='2282')
                {
                $content_new = sdb_get_field('new_section_enterprise_data_governance_data_quality_accelerator', '', get_the_ID());
                }
                if(get_the_ID()=='2310')
                {
                $content_new = sdb_get_field('new_section_genai_powered_conversational_analytics_assistant', '', get_the_ID());
                }
                if(get_the_ID()=='2342')
                {
                $content_new = sdb_get_field('new_section_ai_powered_supply_chain_control_tower_demand_forecasting_platform', '', get_the_ID());
                }
                if(get_the_ID()=='2366')
                {
                $content_new = sdb_get_field('new_section_supply_chain_logistics_control_tower_platform', '', get_the_ID());
                }
                if(get_the_ID()=='2388')
                {
                $content_new = sdb_get_field('new_section_smart_manufacturing_iot_predictive_maintenance_platform', '', get_the_ID());
                }
                
                $casestudies[] = [
                'id'         => get_the_ID(),
                'title'      => get_the_title(),
                'slug'       => get_post_field('post_name'),
                'content'    => sdb_get_field('case_study_section', '', get_the_ID()),
                'content_new'   => $content_new,
                'date'       => get_the_date('Y-m-d'),
                'link'       => get_permalink(),
                'image'      => get_the_post_thumbnail_url(get_the_ID(), 'full'),
                'categories' => $categories,
                'seo'        => $seo_response['seo'] ?? [],
                'schema'     => get_page_schema(get_the_ID()),
            ];
        }

        wp_reset_postdata();
    }

    $casestudies = decode_entities_deep($casestudies);
    $casestudies_final_response = [
        'status' => true,
        'count'  => count($casestudies),
        'data'   => $casestudies
    ];

    return rest_ensure_response($casestudies_final_response);
}



add_action('admin_menu', function () {

    if (current_user_can('author')) {

        remove_menu_page('edit.php?post_type=our_capabilities');
        remove_menu_page('edit.php?post_type=services');
        remove_menu_page('edit.php?post_type=clientlogos');
        remove_menu_page('edit.php?post_type=tools_technologies');
        remove_menu_page('edit.php?post_type=industries');
        remove_menu_page('edit.php?post_type=case_studies');
        remove_menu_page('edit.php?post_type=job_careers');
        remove_menu_page('edit.php?post_type=testimonials');
        remove_menu_page('edit.php?post_type=data_capabilities');
        remove_menu_page('edit.php?post_type=data_industries');
        remove_menu_page('edit.php?post_type=science_industries');
        remove_menu_page('edit.php?post_type=ai_industries');
        remove_menu_page('edit.php?post_type=ai_technology_stack');
        remove_menu_page('edit.php?post_type=engineer_services');
        remove_menu_page('edit.php?post_type=ds_business');
        remove_menu_page('edit.php?post_type=smart_technology');
        remove_menu_page('edit.php?post_type=faq');
        remove_menu_page('wpcf7');
    }

}, 999);


// =============================================================
// Advanced CF7 DB — Draft Status  |  functions.php
// FINAL CORRECT VERSION — uses wpxx_cf7_vdata table
// =============================================================

// ── 1. Add status column to wpxx_cf7_vdata once ───────────────
add_action( 'init', 'acf7db_maybe_add_status_column' );
function acf7db_maybe_add_status_column() {
    if ( get_option( 'acf7db_status_col_v3' ) ) return;

    global $wpdb;
    $table = $wpdb->prefix . 'cf7_vdata';

    $exists = $wpdb->get_var(
        "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME   = '{$table}'
         AND COLUMN_NAME  = 'status'"
    );

    if ( ! $exists ) {
        $wpdb->query(
            "ALTER TABLE `{$table}`
             ADD COLUMN `status` VARCHAR(20) NOT NULL DEFAULT 'published'"
        );
    }

    update_option( 'acf7db_status_col_v3', 1 );
}

// ── 2. AJAX: save status ──────────────────────────────────────
add_action( 'wp_ajax_acf7db_set_status', 'acf7db_set_status_handler' );
function acf7db_set_status_handler() {
    check_ajax_referer( 'acf7db_nonce', 'nonce' );

    $user = wp_get_current_user();
    $allowed_roles = [ 'administrator', 'job_careers_manager' ];
    if ( empty( array_intersect( $allowed_roles, $user->roles ) ) ) {
        wp_send_json_error( 'Unauthorized' );
    }

    global $wpdb;
    $table   = $wpdb->prefix . 'cf7_vdata';
    $ids     = array_map( 'intval', (array)( $_POST['ids'] ?? [] ) );
    $status  = sanitize_text_field( $_POST['status'] ?? '' );

    if ( empty( $ids ) || ! in_array( $status, ['published','draft'], true ) ) {
        wp_send_json_error( 'Invalid data' );
    }

    $placeholders = implode( ',', array_fill( 0, count($ids), '%d' ) );
    $wpdb->query(
        $wpdb->prepare(
            "UPDATE `{$table}` SET `status` = %s WHERE `id` IN ({$placeholders})",
            array_merge( [$status], $ids )
        )
    );

    wp_send_json_success( [ 'updated' => count($ids), 'status' => $status ] );
}

// ── 3. Main UI injection ──────────────────────────────────────
add_action( 'admin_footer', 'acf7db_draft_ui_inject' );
function acf7db_draft_ui_inject() {
    if ( ! is_admin() ) return;
    if ( ( $_GET['page'] ?? '' ) !== 'contact-form-listing' ) return;

    global $wpdb;
    $vdata_table = $wpdb->prefix . 'cf7_vdata';
    $entry_table = $wpdb->prefix . 'cf7_vdata_entry';

    // Get CF7 form ID from URL
    $cf7_id = intval( $_GET['cf7_id'] ?? $_GET['id'] ?? 0 );
    if ( ! $cf7_id ) {
        // fallback: get first form
        $q = new WP_Query([
            'post_type'      => 'wpcf7_contact_form',
            'posts_per_page' => 1,
            'orderby'        => 'title',
            'order'          => 'ASC',
            'fields'         => 'ids',
        ]);
        $cf7_id = ! empty( $q->posts ) ? (int) $q->posts[0] : 0;
    }

    if ( ! $cf7_id ) return;

    // Get all data_ids for this CF7 form from entry table
    $data_ids = $wpdb->get_col(
        $wpdb->prepare(
            "SELECT DISTINCT data_id FROM `{$entry_table}` WHERE cf7_id = %d",
            $cf7_id
        )
    );

    // Get statuses for these data_ids from vdata table
    $status_map      = []; // data_id => status
    $total           = 0;
    $published_count = 0;
    $draft_count     = 0;

    if ( ! empty( $data_ids ) ) {
        $placeholders = implode( ',', array_map('intval', $data_ids) );
        $rows = $wpdb->get_results(
            "SELECT id, status FROM `{$vdata_table}` WHERE id IN ({$placeholders})",
            ARRAY_A
        );
        foreach ( $rows as $row ) {
            $st = ( $row['status'] === 'draft' ) ? 'draft' : 'published';
            $status_map[ (int)$row['id'] ] = $st;
            $st === 'draft' ? $draft_count++ : $published_count++;
        }
        $total = count( $rows );
    }

    $active_filter = sanitize_text_field( $_GET['acf7_status'] ?? 'all' );
    $base_url      = esc_url( remove_query_arg( 'acf7_status' ) );
    $url_published = esc_url( add_query_arg( 'acf7_status', 'published' ) );
    $url_draft     = esc_url( add_query_arg( 'acf7_status', 'draft' ) );

    $cls = [
        'all'       => $active_filter === 'all'       ? 'current' : '',
        'published' => $active_filter === 'published' ? 'current' : '',
        'draft'     => $active_filter === 'draft'     ? 'current' : '',
    ];
    ?>

    <style>
        /* Toast */
        #acf7db-toast {
            display: none;
            position: fixed;
            top: 32px; right: 20px;
            z-index: 99999;
            background: #fff;
            border-left: 4px solid #00a32a;
            box-shadow: 0 2px 8px rgba(0,0,0,.15);
            padding: 12px 20px;
            border-radius: 3px;
            font-size: 14px;
            font-weight: 500;
            color: #1d2327;
            min-width: 280px;
            align-items: center;
            gap: 10px;
        }
        #acf7db-toast.show  { display: flex !important; }
        #acf7db-toast.error { border-left-color: #d63638; }
        #acf7db-toast .t-icon  { font-size: 18px; }
        #acf7db-toast .t-close {
            margin-left: auto; cursor: pointer; color: #888;
            font-size: 16px; background: none; border: none; padding: 0;
        }

        /* Filter tabs */
        #acf7db-tabs { margin: 10px 0 14px; font-size: 13px; line-height: 2; }
        #acf7db-tabs a { text-decoration: none; color: #2271b1; padding: 2px 4px; }
        #acf7db-tabs a.current { color: #1d2327; font-weight: 700; pointer-events: none; }
        #acf7db-tabs a:hover:not(.current) { color: #135e96; }
        #acf7db-tabs .pipe { color: #ddd; margin: 0 5px; }
        #acf7db-tabs .cnt {
            display: inline-block; background: #f0f0f1; color: #50575e;
            border-radius: 9px; padding: 0 7px; font-size: 11px;
            font-weight: 600; margin-left: 2px; vertical-align: middle;
        }
        #acf7db-tabs a.current .cnt { background: #2271b1; color: #fff; }

        /* Badges */
        .acf7db-badge {
            display: inline-block; padding: 2px 9px; border-radius: 10px;
            font-size: 11px; font-weight: 600; line-height: 1.7;
        }
        .acf7db-badge.published { background: #edfaef; color: #0a6b23; border: 1px solid #b8e6bf; }
        .acf7db-badge.draft     { background: #fef9ec; color: #7a5500; border: 1px solid #f5d778; }

        /* Row quick action */
        .acf7db-qa { font-size: 11px; margin-top: 4px; }
        .acf7db-qa a {
            color: #2271b1; cursor: pointer; text-decoration: none;
            padding: 1px 7px; border: 1px solid #c3c4c7;
            border-radius: 3px; background: #f6f7f7; display: inline-block;
        }
        .acf7db-qa a:hover  { background: #2271b1; color: #fff; border-color: #2271b1; }
        .acf7db-qa a.saving { opacity: .6; pointer-events: none; }

        th.acf7db-th, td.acf7db-td { min-width: 110px; vertical-align: middle; }
    </style>

    <div id="acf7db-toast">
        <span class="t-icon">✓</span>
        <span class="t-msg">Status updated.</span>
        <button class="t-close" onclick="document.getElementById('acf7db-toast').classList.remove('show')">✕</button>
    </div>

    <script>
    jQuery(function($){

        var AJAX   = '<?php echo esc_js( admin_url('admin-ajax.php') ); ?>';
        var NONCE  = '<?php echo esc_js( wp_create_nonce('acf7db_nonce') ); ?>';
        var MAP    = <?php echo wp_json_encode( $status_map ); ?>; // { data_id: 'draft'|'published' }
        var FILTER = '<?php echo esc_js( $active_filter ); ?>';

        // ── Toast ─────────────────────────────────────────────
        function showToast( msg, type ) {
            var $t = $('#acf7db-toast');
            $t.removeClass('error');
            if ( type === 'error' ) $t.addClass('error');
            $t.find('.t-icon').text( type === 'error' ? '✕' : '✓' );
            $t.find('.t-msg').text( msg );
            $t.addClass('show');
            if ( type !== 'error' ) {
                setTimeout(function(){ window.location.reload(); }, 2000 );
            } else {
                setTimeout(function(){ $t.removeClass('show'); }, 3500 );
            }
        }

        // ── Badge HTML ────────────────────────────────────────
        function badge(st) {
            return '<span class="acf7db-badge '+st+'">'+(st==='draft'?'Draft':'Published')+'</span>';
        }

        // ── Get data_id from row ──────────────────────────────
        // Plugin renders edit icon with onclick like:
        // vsz_cf7_edit_record(18, 1000)  — first arg is data_id
        function getDataId($row) {
            var did = 0;

            // onclick pattern — first number = data_id
            $row.find('[onclick]').each(function(){
                if (did) return;
                var m = ($(this).attr('onclick')||'').match(/\(\s*(\d+)\s*[,)]/);
                if (m) did = parseInt(m[1]);
            });

            // data-rid or data-id attribute
            if (!did) {
                $row.find('[data-rid],[data-id],[data-data_id]').each(function(){
                    if (did) return;
                    did = parseInt( $(this).data('rid') || $(this).data('id') || $(this).data('data_id') ) || 0;
                });
            }

            // href with rid= or data_id=
            if (!did) {
                $row.find('a[href]').each(function(){
                    if (did) return;
                    var m = ($(this).attr('href')||'').match(/[?&](?:rid|data_id)=(\d+)/);
                    if (m) did = parseInt(m[1]);
                });
            }

            return did;
        }

        // ── 1. Filter tabs ────────────────────────────────────
        $('select[name="action"]').closest('div,p').first().before(
            '<div id="acf7db-tabs">' +
                '<a href="<?php echo $base_url; ?>" class="<?php echo $cls['all']; ?>">All <span class="cnt"><?php echo $total; ?></span></a>' +
                '<span class="pipe">|</span>' +
                '<a href="<?php echo $url_published; ?>" class="<?php echo $cls['published']; ?>">Published <span class="cnt"><?php echo $published_count; ?></span></a>' +
                '<span class="pipe">|</span>' +
                '<a href="<?php echo $url_draft; ?>" class="<?php echo $cls['draft']; ?>">Draft <span class="cnt"><?php echo $draft_count; ?></span></a>' +
            '</div>'
        );

        // ── 2. Add to Bulk Actions above Delete ───────────────
        $('select[name="action"] option').filter(function(){
            return $(this).val()==='delete' || $(this).text().trim().toLowerCase()==='delete';
        }).before(
            '<option value="acf7_draft">Mark as Draft</option>' +
            '<option value="acf7_published">Mark as Published</option>'
        );

        // ── 3. Status column header ───────────────────────────
        $('table.wp-list-table thead tr, table.wp-list-table tfoot tr')
            .append('<th class="acf7db-th">Status</th>');

        // ── 4. Status cell per row ────────────────────────────
        $('table.wp-list-table tbody tr').each(function(){
            var $row = $(this);
            var did  = getDataId($row);
            var st   = (did && MAP[did]) ? MAP[did] : 'published';

            $row.attr('data-did', did).attr('data-st', st);

            // Apply filter on load
            if (FILTER !== 'all' && st !== FILTER) $row.hide();

            var altSt  = st === 'draft' ? 'published' : 'draft';
            var altLbl = st === 'draft' ? '↑ Publish'  : '↓ Draft';

            $row.append(
                '<td class="acf7db-td">' +
                    badge(st) +
                    '<div class="acf7db-qa">' +
                        '<a class="acf7db-toggle" data-to="'+altSt+'">'+altLbl+'</a>' +
                    '</div>' +
                '</td>'
            );
        });

        // ── 5. Row quick toggle ───────────────────────────────
        $(document).on('click', '.acf7db-toggle', function(e){
            e.preventDefault();
            var $a   = $(this), $row = $a.closest('tr');
            var did  = parseInt($row.attr('data-did'));
            var newSt = $a.data('to');

            if (!did) { showToast('Could not find entry ID. Check console.','error'); console.log($row[0]); return; }

            $a.addClass('saving').text('Saving…');

            $.post(AJAX,{
                action : 'acf7db_set_status',
                nonce  : NONCE,
                ids    : [did],
                status : newSt
            },function(r){
                if (r.success) {
                    showToast('Entry marked as '+(newSt==='draft'?'Draft':'Published')+'. Refreshing…');
                } else {
                    $a.removeClass('saving').text(newSt==='draft'?'↓ Draft':'↑ Publish');
                    showToast(r.data||'Something went wrong.','error');
                }
            });
        });

        // ── 6. Bulk apply ─────────────────────────────────────
        $(document).on('click','input[value="Apply"]',function(e){
            var action = $('select[name="action"]').val();
            if (action!=='acf7_draft' && action!=='acf7_published') return;
            e.preventDefault(); e.stopImmediatePropagation();

            var newSt = action==='acf7_draft' ? 'draft' : 'published';
            var ids   = [];

            $('table.wp-list-table tbody tr:visible').each(function(){
                if ($(this).find('input[type="checkbox"]').is(':checked')) {
                    var did = parseInt($(this).attr('data-did'));
                    if (did) ids.push(did);
                }
            });

            if (!ids.length) { showToast('Please select at least 1 entry.','error'); return; }

            $.post(AJAX,{
                action : 'acf7db_set_status',
                nonce  : NONCE,
                ids    : ids,
                status : newSt
            },function(r){
                if (r.success) {
                    showToast( ids.length+' entr'+(ids.length>1?'ies':'y')+' marked as '+(newSt==='draft'?'Draft':'Published')+'. Refreshing…' );
                } else {
                    showToast(r.data||'Something went wrong.','error');
                }
            });
        });

    });
    </script>
    <?php
}
// =============================================================
// END ACF7 DB Draft
// =============================================================why_organizations_trust_code1_tech_systems