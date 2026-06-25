def normalize(x, min_v, max_v, invert=False):
    val = (x - min_v) / (max_v - min_v)
    return 1 - val if invert else val