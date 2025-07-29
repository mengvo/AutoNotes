# AutoNotes
use `source venv/bin/activate` to enter virtual env.
<br>
use `uvicorn main:app --reload` to run backend.
<br>
use `npm run dev` to run frontend.
<br>
TODO: create your own FileList component to display the list, so we can add txt files and customize the file list. Make it similar to 
TopicInput, so only display it if there's a file to display. You can add a state to the FileList called like 'files' which will be an
array of files. Also need to figure out how to add .txt to the formData in handleSubmit in InputSection; will need to update backend
as well. '/generate_notes' should now take a file list and a list of strings (.txt files) OR we can make one big file array. TopicInput
is pretty much done.
