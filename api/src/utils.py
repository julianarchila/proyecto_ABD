import geopy.distance


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



def predict_fraud(transaction):
    """
    Predict if a transaction is fraud or not
    :param transaction: Transaction
    :return: bool
    """

    # TODO: Use our logistic regression model to predict if a transaction is fraud or not
    return True
