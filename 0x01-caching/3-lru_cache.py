#!/usr/bin/env python3

"""
a class LRUCache that inherits from BaseCaching and is a caching system
"""

from collections import OrderedDict
BasicCache = __import__('0-basic_cache').BasicCache
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BasicCache):
    """
    Implement the LRU caching algorithm
    """
    lru = OrderedDict()  # keep track of recently used key

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
            self.lru[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                item = self.lru.popitem(last=False)  # delete first key in dict
                self.cache_data.pop(item[0])
                print(f'DISCARD: {item[0]}')

    def get(self, key):
        """ Get an item by key
        """
        if self.cache_data.get(key):
            self.lru.move_to_end(key)  # move recently used key to end
        return self.cache_data.get(key)
