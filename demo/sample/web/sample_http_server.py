import http.server
import socketserver
import os

PORT = 8000
# Define the files to try, in order of preference
TRY_FILES = ["index.html", "404.html"]


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Save the original path
        original_path = self.path

        # Check if the requested path is a directory (default behavior handles directory listing/index.html)
        if os.path.isdir(self.translate_path(self.path)):
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        if os.path.exists(self.translate_path(self.path)):
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        # Try specific fallback files
        for fallback in TRY_FILES:
            self.path = f"/{fallback}"  # Set the path to the fallback file
            full_path = self.translate_path(self.path)
            if os.path.exists(full_path):
                # If a fallback file exists, serve it
                print(f"File not found: {original_path}. Serving fallback: {fallback}")
                return http.server.SimpleHTTPRequestHandler.do_GET(self)

        # If all fallbacks fail, reset path and let default handler serve a 404
        self.path = original_path
        print(f"All files not found. Serving 404 for: {original_path}")
        return http.server.SimpleHTTPRequestHandler.do_GET(self)


# Run the server with the custom handler
with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
    print(f"Serving at port {PORT}")
    print(f"Trying files in order: {TRY_FILES}")
    httpd.serve_forever()
