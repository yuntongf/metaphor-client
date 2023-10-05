# What's up in __

This project integrates the search, get content, and find similar links APIs from Metaphor. It aims to provide the user with the most up to date information on the internet about events happening in a city, and the opportunity to plan events by adding them to calender.

To run the project, go to the backend folder, add a python script called `config.py`, where you enter following information: 

```
OPENAI_API_KEY="your OpenAI API key"
METAPHOR_API_KEY="your Metaphor API key"
```

Now run the `metaphor.py` script in the backend folder. You should see a Flask app start running.

For the frontend, we first `npm install` all packages, and run the React app with `npm start`.

After these steps, the app should be up and running locally. If there's any issues, please contact me.