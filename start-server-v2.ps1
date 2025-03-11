# Simple PowerShell Web Server
$port = 8082
$directory = (Get-Location).Path

# Create a listener on port 8082
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Web server running at http://localhost:$port/"
Write-Host "Press Ctrl+C to stop the server"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Get the requested URL path
        $requestUrl = $request.Url.LocalPath
        $requestUrl = $requestUrl -replace "/", "\\"
        
        # Default to index.html if root is requested
        if ($requestUrl -eq "\\") {
            $requestUrl = "\index.html"
        }
        
        # Combine with the physical directory
        $physicalPath = Join-Path $directory $requestUrl.Substring(1)
        
        # Check if the file exists
        if (Test-Path $physicalPath -PathType Leaf) {
            # Determine content type based on file extension
            $contentType = "text/plain"
            switch ([System.IO.Path]::GetExtension($physicalPath)) {
                ".html" { $contentType = "text/html" }
                ".css"  { $contentType = "text/css" }
                ".js"   { $contentType = "application/javascript" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".png"  { $contentType = "image/png" }
                ".gif"  { $contentType = "image/gif" }
                ".svg"  { $contentType = "image/svg+xml" }
                ".json" { $contentType = "application/json" }
            }
            
            # Read the file content
            $content = [System.IO.File]::ReadAllBytes($physicalPath)
            
            # Set response headers
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            
            # Write the content to the response output stream
            $output = $response.OutputStream
            $output.Write($content, 0, $content.Length)
            $output.Close()
            
            Write-Host "200 OK: $requestUrl"
        }
        else {
            # File not found
            $response.StatusCode = 404
            $response.Close()
            
            Write-Host "404 Not Found: $requestUrl"
        }
    }
}
finally {
    # Stop the listener when done
    $listener.Stop()
}
