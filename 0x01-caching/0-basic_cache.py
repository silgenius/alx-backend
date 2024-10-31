#!/usr/bin/env python3

"""
Module - Basic Cache
"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    Implement put and get for caching system
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
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
