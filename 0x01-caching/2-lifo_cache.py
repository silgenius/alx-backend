#!/usr/bin/env python3

"""
a class FIFOCache that inherits from BaseCaching and is a caching system
"""

BasicCache = __import__('0-basic_cache').BasicCache
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BasicCache):
    """
    Implement the LIFO caching algorithm
    """
    def __init__(self):
        """
        Initialize
        """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if len(self.cache_data) == BaseCaching.MAX_ITEMS:
                popitem = self.cache_data.popitem()
                print(f'DISCARD: {popitem[0]}')
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
