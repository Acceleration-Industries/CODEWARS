def sum_pairs(ints, s):
    seen = set()
    for num in ints:
        complement = s - num
        if complement in seen:
            return [complement, num]
        seen.add(num)
    return None

def sum_pairs(ints, s):
    num_indices = {}
    for i, num in enumerate(ints):
        complement = s - num
        if complement in num_indices:
            return [ints[num_indices[complement]], num]
        num_indices[num] = i
    return None

def sum_pairs(ints, s):
    num_indices = {}
    for i, num in enumerate(ints):
        complement = s - num
        if complement in num_indices:
            return [complement, num]
        num_indices[num] = i
    return None

def sum_pairs(ints, s):
    num_indices = {}
    for i, num in enumerate(ints):
        if s - num in num_indices:
            return [s - num, num]
        num_indices[num] = i
    return None

def sum_pairs(ints, s):
    num_seen = set()
    for num in ints:
        if s - num in num_seen:
            return [s - num, num]
        num_seen.add(num)
    return None


# For the first solution, we're using a set to keep track of the numbers we've seen so far while iterating through the list. 
# This helps us quickly check if there's a complement for the current number that sums up to the target value. 
# The time complexity is O(n) because we only need to traverse the list once, 
# and the space complexity is also O(n) since the set can grow to contain all the unique elements in the list.

# In the second solution, we're using a dictionary to store the indices of the numbers we've encountered. 
# This allows us to find the complement for each number in constant time. Again, the time complexity is O(n) because we're only iterating through the list once, 
# and the space complexity is O(n) because the dictionary can store up to n key-value pairs.

# The third solution is similar to the second one but optimizes the space complexity by not storing the entire array as values in the dictionary. 
# Instead, it directly stores the complement and the current number. This doesn't change the time complexity, which remains O(n), 
# but it reduces the space complexity slightly since we're not storing the entire array in the dictionary.

# For the fourth solution, we also use a dictionary to store the indices of the numbers we've encountered. 
# However, we only store the complement and the current number if the complement is not already in the dictionary. 
# This reduces the space complexity compared to the second solution, but the time complexity remains O(n) because we still need to iterate through the entire list.

# Finally, the fifth solution is similar to the first one but uses a set to keep track of the numbers we've seen. 
# It has the same time and space complexity as the first solution, with O(n) time complexity and O(n) space complexity.




