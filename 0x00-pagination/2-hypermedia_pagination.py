#!/usr/bin/env python3

"""
To be written
"""


import csv
import math
from typing import List, Tuple, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    return a tuple of size two containing a start index and an end
    index corresponding to the range of indexes
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        return the appropriate page of the dataset
        (i.e. the correct list of rows).
        """
        assert isinstance(page, int)
        assert page > 0
        assert isinstance(page_size, int)
        assert page_size > 0
        index = index_range(page, page_size)
        result = []
        start_index = index[0]
        end_index = index[1]
        dataset = self.dataset()
        try:
            while start_index < end_index:
                result.append(dataset[start_index])
                start_index += 1
        except IndexError:
            pass
        finally:
            return result

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        get_hyper_index method with two integer arguments: index with a
        None default value and page_size with default value of 10
        """
        hyper = {}
        data = self.get_page(page, page_size)
        hyper['page_size'] = len(data)
        hyper['page'] = page
        hyper['data'] = data

        dataset = self.dataset()
        total_pages = math.ceil(len(dataset) / page_size)
        start_index, end_index = index_range(page, page_size)

        try:
            data = dataset[end_index]
            hyper['next_page'] = page + 1
        except IndexError:
            hyper['next_page'] = None

        if start_index == 0:
            hyper['prev_page'] = None
        else:
            hyper['prev_page'] = page - 1

        hyper['total_pages'] = total_pages

        return hyper
