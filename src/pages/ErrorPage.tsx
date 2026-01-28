import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
                <p className="mb-4 text-xl text-muted-foreground">{error instanceof Error ? error.message : "Unknown error"}</p>
            </div>
        </div>
    );
}
