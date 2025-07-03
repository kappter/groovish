<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <style>
      body { font-family: Arial; padding: 20px; }
      input, button { margin-top: 10px; display: block; }
    </style>
  </head>
  <body>
    <h2>🎶 Music Collaboration Prototype</h2>

    <label>Create or Join Session:</label>
    <input type="text" id="sessionName" placeholder="Session ID or Name">
    <button onclick="createSession()">Create/Join</button>

    <div id="uploadUI" style="display:none;">
      <label>Upload Your Track:</label>
      <input type="file" id="fileUpload">
      <button onclick="uploadFile()">Upload</button>
    </div>

    <p id="result"></p>

    <script>
      let currentSession = "";

      function createSession() {
        const name = document.getElementById("sessionName").value;
        google.script.run.withSuccessHandler(res => {
          currentSession = name;
          document.getElementById("result").innerHTML = 
            `Session ${res.status}: <a href="${res.url}" target="_blank">Open Folder</a>`;
          document.getElementById("uploadUI").style.display = "block";
        }).createSession(name);
      }

      function uploadFile() {
        const fileInput = document.getElementById("fileUpload");
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
          const content = reader.result.split(",")[1];
          const data = {
            name: file.name,
            mimeType: file.type,
            data: content
          };
          google.script.run.withSuccessHandler(() => {
            document.getElementById("result").innerHTML += `<br>✅ Uploaded ${file.name}`;
          }).uploadFile(currentSession, data);
        };
        reader.readAsDataURL(file);
      }
    </script>
  </body>
</html>
