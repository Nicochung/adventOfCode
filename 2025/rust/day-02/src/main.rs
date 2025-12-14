fn main() {
    let input1 = include_str!("input1.txt");
    let input2 = include_str!("input2.txt");
    println!("{}", part1(input1));
    println!("{}", part2(input2));
}

fn part1(input: &str) -> u64 {
    let mut sum = 0;

    // Pattern appear twice 55 (5 twice), 6464 (64 twice), and 123123 (123 twice)
    fn is_id_valid(id: u64) -> bool {
        let str = id.to_string();
        let len = str.len();
        let (first, second) = str.split_at(len / 2);
        first != second
    }

    input.split(",").for_each(|v| {
        let mut iter = v.split("-");
        // TODO Validate iterator
        let first_id = iter.next().unwrap();
        let last_id = iter.next().unwrap();

        let first_id: u64 = first_id.parse().unwrap();
        let last_id: u64 = last_id.parse().unwrap();

        for id in first_id..=last_id {
            if !is_id_valid(id) {
                sum += id;
            }
        }
    });
    sum
}

fn part2(input: &str) -> u64 {
    let mut sum = 0;

    // sequence of digits repeated at least twice. So, 12341234 (1234 two times), 123123123 (123 three times), 1212121212 (12 five times), and 1111111 (1 seven times)
    fn is_id_valid(id: u64) -> bool {
        let str = id.to_string();
        let len = str.len();
        // Window size 1 -> len / 2, only if len % n === 0
        for window in 1..=len / 2 {
            if len % window != 0 {
                continue;
            }
            let sub_string = str[0..window].repeat(len / window);
            if str == sub_string {
                return false;
            }
        }
        true
    }

    input.split(",").for_each(|v| {
        let mut iter = v.split("-");
        // TODO Validate iterator
        let first_id = iter.next().unwrap();
        let last_id = iter.next().unwrap();

        let first_id: u64 = first_id.parse().unwrap();
        let last_id: u64 = last_id.parse().unwrap();

        for id in first_id..=last_id {
            if !is_id_valid(id) {
                sum += id;
            }
        }
    });
    sum
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
        assert_eq!(part1(input), 1227775554);
    }

    #[test]
    fn part2_example() {
        let input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
        assert_eq!(part2(input), 4174379265);
    }
}
