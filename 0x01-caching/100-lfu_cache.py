#!/usr/bin/env python3

"""
a class LFUCache that inherits from BaseCaching and is a caching system
"""

BasicCache = __import__('0-basic_cache').BasicCache
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BasicCache):
    """
    Implement the LRU caching algorithm
    """
    key_count = {}  # keep track of recently used key

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
                sorted_keys = sorted(
                        self.key_count.items(),
                        key=lambda x: x[1]
                        )
                self.cache_data.pop(sorted_keys[0][0])
                self.key_count.pop(sorted_keys[0][0])
                print(f'DISCARD: {sorted_keys[0][0]}')

            if self.key_count.get(key):
                self.key_count[key] += 1
            else:
                self.key_count[key] = 0

    def get(self, key):
        """ Get an item by key
        """
        if self.cache_data.get(key):
            self.key_count[key] += 1
        return self.cache_data.get(key)
