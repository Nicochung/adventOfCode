fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}

fn part1(input: &str) -> u32 {
    let mut sum = 0;

    fn get_max_digit(v: &str) -> (u32, usize) {
        let mut max = 0;
        let mut max_idx = 0;
        for (idx, val) in v.chars().enumerate() {
            let val = val.to_digit(10).unwrap();
            if val > max {
                max = val;
                max_idx = idx;
            }
        }
        (max, max_idx)
    }

    input.lines().for_each(|v| {
        // Get the largest digit and idx
        let (max, max_idx) = get_max_digit(v);

        // Pick 2 digit to form max
        // Get the largest digit after the max
        let (max_after, _) = get_max_digit(&v[max_idx + 1..]);

        let (max_before, _) = get_max_digit(&v[0..max_idx]);
        // See if the max is used as the first or second digit
        let first = max_before * 10 + max;
        let second = max * 10 + max_after;

        if max_after == 0 {
            sum += first;
            return;
        }
        if first > second {
            sum += first;
        } else {
            sum += second
        }
    });
    sum
}

fn part2(input: &str) -> u64 {
    let mut sum: u64 = 0;
    fn get_max_digit(v: &str) -> (u64, usize) {
        let mut max: u64 = 0;
        let mut max_idx = 0;
        for (idx, val) in v.chars().enumerate() {
            let val = val.to_digit(10).unwrap() as u64;
            if val > max {
                max = val;
                max_idx = idx;
            }
        }
        (max, max_idx)
    }

    // Pick 12 digit to form max
    input.lines().for_each(|v| {
        // Get the largest digit and idx
        let mut val: u64 = 0;
        let mut start_idx = 0;
        for i in 1..=12 {
            let (max, max_idx) = get_max_digit(&v[start_idx..v.len() - (12 - i)]);
            val = val * 10 + max;
            start_idx = start_idx + max_idx + 1;
        }
        sum += val;
    });
    sum
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "987654321111111
811111111111119
234234234234278
818181911112111";
        assert_eq!(part1(input), 357);
    }

    #[test]
    fn part2_example() {
        let input = "987654321111111
811111111111119
234234234234278
818181911112111";
        assert_eq!(part2(input), 3121910778619);
    }
}
