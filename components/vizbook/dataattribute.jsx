export const data_attributes = {
    "Survival": {
        "Description": "Shows if the passenger survived or not. 1 stands for survived and 0 stands for not survived.",
        "Type": "int",
        "Value Range": "0 = No, 1 = Yes",
        "Value Average": 0.3838
    },
    "Pclass": {
        "Description": "Ticket class. 1 stands for First class ticket. 2 stands for Second class ticket. 3 stands for Third class ticket.",
        "Type": "int",
        "Value Range": "1 = 1st, 2 = 2nd, 3 = 3rd",
        "Value Average":2.3086
    },
    "Gender": {
        "Description": "Passenger's Gender. It's either Male or Female.",
        "Type": "string",
        "Value Range": "Male, Female",
        "Value Average": "N/A"
    },
    "Age": {
        "Description": "Passenger's age. NaN values in this column indicates that the age of that particular passenger has not been recorded.",
        "Type": "float",
        "Value Range": "0.42-80.0",
        "Value Average": 29.6991
    },
    "SibSp": {
        "Description": "Number of siblings or spouses travelling with each passenger.",
        "Type": "int",
        "Value Range": "0-8",
        "Value Average": 0.5230
    },
    "Parch": {
        "Description": "Number of parents of children travelling with each passenger.",
        "Type": "int",
        "Value Range": "0-6",
        "Value Average": 0.3816
    },
    "Ticket": {
        "Description": "Ticket number",
        "Type": "string",
        "Value Range": "N/A",
        "Value Average": "N/A"
    },
    "Fare": {
        "Description": "How much money the passenger has paid for the travel journey",
        "Type": "float",
        "Value Range": "0.00-512.33",
        "Value Average":32.2042
    },
    "Cabin": {
        "Description": "Cabin number of the passenger. NaN values in this column indicates that the cabin number of that particular passenger has not been recorded.",
        "Type": "string",
        "Value Range": "N/A",
        "Value Average": "N/A"
    },
    "Embarked": {
        "Description": "Port from where the particular passenger was embarked/boarded.",
        "Type": "string",
        "Value Range": "C = Cherbourg, Q = Queenstown, S = Southampton",
        "Value Average": "N/A"
    }
}