use std::collections::HashMap;
use std::fs::read_to_string;

// https://doc.rust-lang.org/stable/rust-by-example/std_misc/file/read_lines.html#a-naive-approach
fn main() {
    // let input = include_str!("../../data.txt");
    let filename = "data.txt";

    let mut input_array: Vec<String> = read_to_string(filename)
        .unwrap() // panic on possible file-reading errors
        .lines() // split the string into an iterator of string slices
        .map(String::from) // make each slice into a string
        .collect(); // gather them together into a vector

    let split_index = input_array.iter().position(|x| x == "").unwrap();
    println!("{}", split_index);
    let updates = input_array.split_off(split_index + 1);
    input_array.pop();
    let safety_manual = input_array;

    // Create map from safety_manual
    let mut manual_map = HashMap::<i32, Vec<i32>>::new();
    safety_manual.iter().for_each(|x| {
        let arr: Vec<i32> = x.split("|").map(|x| x.parse::<i32>().unwrap()).collect();
        let start = arr[0];
        let end = arr[1];
        if manual_map.contains_key(start.clone()) {
            // Append this map
            manual_map.get(start.clone()).unwrap().push(end);
        }
    });
}

fn part1(input: &str) -> String {
    "todo!()".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = part1(
            "47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47",
        );
        assert_eq!(result, "143".to_string());
    }
}
