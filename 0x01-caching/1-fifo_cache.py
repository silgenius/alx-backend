#!/usr/bin/env python3

"""
a class FIFOCache that inherits from BaseCaching and is a caching system
"""

BasicCache = __import__('0-basic_cache').BasicCache
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BasicCache):
    """
    Implement the FIFO caching algorithm
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
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                first_item = list(self.cache_data.keys())[0]
                self.cache_data.pop(first_item)
                print(f'DISCARD: {first_item}')

    def get(self, key):
        """ Get an item by key
        """
        return self.cache_data.get(key)
