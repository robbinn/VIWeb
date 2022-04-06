import datetime

from flask import Flask, render_template, request
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import random

def create_app():
    load_dotenv("MONGODB_URI")
    application = Flask(__name__)
    client = MongoClient(os.environ.get("MONGODB_URI"))

    @application.route('/graphingcalculator')
    def graphing_calculator():
        return render_template("graphing_calculator.html")

    @application.route('/profile')
    def profile():
        return render_template("profile.html")

    @application.route('/weather')
    def weather():
        return render_template("weather.html")

    @application.route('/slidingpuzzle')
    def sliding_puzzle():
        return render_template("sliding_puzzle.html")

    @application.route('/quicksort')
    def quick_sort():
        return render_template("quick_sort.html")

    @application.route('/')
    def home():
        return render_template("home.html")

    @application.route('/quiz/topics')
    def quiz_topics():
        application.db = client['quiz']
        topics = application.db.list_collection_names()

        return render_template("quiz_topics.html", topics=topics)

    @application.route('/quiz/<quiz_name>', methods=['GET'])
    def quiz(quiz_name):
        r = request.args.get("random")
        category = []
        answer_set = []
        question_set = application.db[quiz_name].find({})
        for question in question_set:
            category = list(question.keys())[1:]
            temp = []
            for i in range(len(category)):
                temp.append(question[category[i]])
            answer_set.append(temp)

        if r == 'True':
            random.shuffle(answer_set)

        return render_template("quiz_app.html", answer_set=answer_set, category=category)

    @application.route('/microblog', methods=["GET", "POST"])
    def microblog():  # put application's code here
        application.db = client['microblog']

        if request.method == 'POST':
            entry_content = request.form.get("content")
            formatted_date = datetime.datetime.today().strftime("%Y-%m-%d")
            application.db['entries'].insert_one({"content": entry_content, 'date': formatted_date})

        entries_with_date = [(
            entry["content"],
            entry["date"],
            datetime.datetime.strptime(entry["date"], "%Y-%m-%d").strftime("%b %d")
        ) for entry in application.db['entries'].find({})
        ]

        return render_template('microblog.html', entries=entries_with_date)

    return application
