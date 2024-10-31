#!/usr/bin/env python3

"""
a class MRUCache that inherits from BaseCaching and is a caching system
"""

BasicCache = __import__('0-basic_cache').BasicCache
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BasicCache):
    """
    Implement the LRU caching algorithm
    """
    mru = None  # keep track of recently used key

    def __init__(self):
        """
        Initialize
        """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if self.cache_data.get(key):  # Get mru if key is updated
                self.mru = key

            # Get mru as last item in cache if mru is none
            if self.mru is None and self.cache_data:
                self.mru = list(self.cache_data.keys())[-1]

            self.cache_data[key] = item

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                item = self.cache_data.pop(self.mru)
                print(f'DISCARD: {self.mru}')
                self.mru = None  # Reset mru after every deletion

    def get(self, key):
        """ Get an item by key
        """
        if self.cache_data.get(key):
            self.mru = key  # Update mru to requested data
        return self.cache_data.get(key)
