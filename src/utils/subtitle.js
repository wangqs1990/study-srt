

export const search = (list, time) => {
    time = time * 1000;
    if (time < list[0].start) {
        return 0;
    }
    if (time > list[list.length - 1].end) {
        return list.length - 1;
    }
    return list.findIndex(sub => sub.start <= time && sub.end >= time);
}

export const searchNext = (list, time, i) => {
    time = time * 1000;
    if (i === 0) {
        if (time < list[i].start) {
            return 0;
        }
    }
    if (time < list[i].start) {
        for (let n = i; n >= 0; n--) {
            if (list[n].end <= time) {
                break;
            }
            if (list[n].start <= time) {
                return n;
            }
        }
    } else {
        for (let n = i; n < list.length; n++) {
            if (list[n].end >= time) {
                return n;
            }
        }
    }
    return i;
}