import geopy.distance
import pickle
from .models import Transaction




def distance_between_points(point1, point2):
    """
    Calculate the distance between two points
    :param point1: tuple of (latitude, longitude)
    :param point2: tuple of (latitude, longitude)
    :return: distance in meters
    """
    return geopy.distance.distance(point1, point2).kilometers

def string_to_tuple(string):
    """
    Convert a string to a tuple
    :param string: string in the format "latitude, longitude"
    :return: tuple of (latitude, longitude)
    """
    return tuple(map(float, string.split(',')))



def predict_fraud(transaction:Transaction):
    """
    Predict if a transaction is fraud or not
    :param transaction: Transaction
    :return: bool
    """


    # Load the model
    with open('model.pkl', 'rb') as file:
        classifier = pickle.load(file)



    features = [ transaction.distance_from_home, transaction.distance_from_last_transaction, transaction.ratio_to_median_purchase_price, transaction.repeat_retailer, transaction.used_chip, transaction.used_pin_number, transaction.online_order ]

    # cast all values to float
    features = list(map(float, features))



    # Make a prediction
    prediction = classifier.predict([features])[0]

    print("API[UTILS] prediction: ",prediction)

    # Return the prediction
    if prediction == 0:
        return False
    else:
        return True


