
export const getSrtData = (item) => {
    if (!item) {
        throw new Error('unexpect srt item data');
    }
    return item.data ? item.data : item;
}

export const search = (list, time) => {
    time = time * 1000;
    if (time < getSrtData(list[0]).start) {
        return 0;
    }
    if (time > getSrtData(list[list.length - 1]).end) {
        return list.length - 1;
    }
    return list.findIndex(sub => getSrtData(sub).start <= time && getSrtData(sub).end >= time);
}

export const searchNext = (list, time, i) => {
    time = time * 1000;
    if (i === 0) {
        if (time < getSrtData(list[i]).start) {
            return 0;
        }
    }
    if (time < getSrtData(list[i]).start) {
        for (let n = i; n >= 0; n--) {
            if (getSrtData(list[n]).end <= time) {
                break;
            }
            if (getSrtData(list[n]).start <= time) {
                return n;
            }
        }
    } else {
        for (let n = i; n < list.length; n++) {
            if (getSrtData(list[n]).end >= time) {
                return n;
            }
        }
    }
    return i;
}