fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}

fn merge_ranges(ranges: Vec<Range>) -> Vec<Range> {
    let mut ranges = ranges.clone();
    ranges.sort();
    let mut merged_range = vec![];
    let mut current_range = ranges[0];
    let mut extra_push = false;
    for i in 1..ranges.len() {
        let new_range = ranges[i];
        // Check if the new range can be merged into the current range
        // Case 1, two range with no intersection
        if current_range.end < new_range.start {
            merged_range.push(current_range);
            current_range = new_range;
            // extra push when it is the last item
            extra_push = i == ranges.len() - 1;
        } else if new_range.end >= current_range.end {
            // new range ends later, update current range end
            current_range.end = new_range.end;
            extra_push = true;
        }
    }
    if extra_push {
        merged_range.push(current_range);
    }
    merged_range
}

#[derive(Debug, Clone, Copy, PartialEq, PartialOrd, Eq, Ord)]
struct Range {
    start: u64,
    end: u64,
}

fn part1(input: &str) -> String {
    let mut iter = input.lines();
    let mut ranges = vec![];
    loop {
        let word = iter.next().unwrap();
        if word.is_empty() {
            break;
        }
        ranges.push(word);
    }
    let mut fresh_ids = iter
        .map(|v| v.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();
    fresh_ids.sort();

    let ranges = ranges
        .iter()
        .map(|range| {
            let mut iter = range.split("-");
            let start = iter.next().unwrap().parse::<u64>().unwrap();
            let end = iter.next().unwrap().parse::<u64>().unwrap();
            Range { start, end }
        })
        .collect::<Vec<Range>>();
    let merged_range = merge_ranges(ranges);

    // println!("{merged_range:?}");
    // println!("{fresh_ids:?}");

    let cnt = fresh_ids
        .into_iter()
        .filter(|id| {
            merged_range
                .iter()
                .any(|range| range.start <= *id && *id <= range.end)
        })
        .count();
    format!("{cnt}")
}

fn part2(input: &str) -> String {
    let mut iter = input.lines();
    let mut ranges = vec![];
    loop {
        let word = iter.next().unwrap();
        if word.is_empty() {
            break;
        }
        ranges.push(word);
    }

    let ranges = ranges
        .iter()
        .map(|range| {
            let mut iter = range.split("-");
            let start = iter.next().unwrap().parse::<u64>().unwrap();
            let end = iter.next().unwrap().parse::<u64>().unwrap();
            Range { start, end }
        })
        .collect::<Vec<Range>>();
    let merged_range = merge_ranges(ranges);

    // println!("{merged_range:?}");
    // println!("{fresh_ids:?}");
    let cnt = merged_range
        .iter()
        .map(|range| range.end - range.start + 1)
        .sum::<u64>();
    // let cnt = fresh_ids
    //     .into_iter()
    //     .filter(|id| {
    //         merged_range
    //             .iter()
    //             .any(|range| range.start <= *id && *id <= range.end)
    //     })
    //     .count();
    format!("{cnt}")
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn merge_ranges_test() {
        assert_eq!(
            merge_ranges(vec![
                Range { start: 3, end: 5 },
                Range { start: 10, end: 14 },
                Range { start: 16, end: 20 },
                Range { start: 12, end: 18 }
            ]),
            vec![Range { start: 3, end: 5 }, Range { start: 10, end: 20 }]
        );
        assert_eq!(
            merge_ranges(vec![
                Range { start: 3, end: 5 },
                Range { start: 10, end: 14 },
                Range { start: 16, end: 20 },
                Range { start: 12, end: 18 },
                Range { start: 25, end: 30 },
            ]),
            vec![
                Range { start: 3, end: 5 },
                Range { start: 10, end: 20 },
                Range { start: 25, end: 30 },
            ]
        );
    }

    #[test]
    fn part1_example() {
        let input = "3-5
10-14
16-20
12-18

1
5
8
11
17
32";
        assert_eq!(part1(input), "3");
    }

    #[test]
    fn part2_example() {
        let input = "3-5
10-14
16-20
12-18

1
5
8
11
17
32";
        assert_eq!(part2(input), "14");
    }
}
