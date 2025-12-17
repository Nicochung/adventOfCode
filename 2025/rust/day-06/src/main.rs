fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}

fn part1(input: &str) -> String {
    // for line in input.lines().rev() {
    //     let formatted = line.trim().split_whitespace().collect::<Vec<&str>>();
    //     println!("{formatted:?}");
    // }
    let mut rev_iter = input.lines().rev();
    let operators = rev_iter
        .next()
        .unwrap()
        .trim()
        .split_whitespace()
        .collect::<Vec<&str>>();

    let mut sums = rev_iter
        .next()
        .unwrap()
        .trim()
        .split_whitespace()
        .map(|v| v.parse::<u64>().unwrap())
        .collect::<Vec<u64>>();

    while let Some(nums) = rev_iter.next() {
        let current_line = nums
            .trim()
            .split_whitespace()
            .map(|v| v.parse::<u64>().unwrap());
        for (idx, val) in current_line.enumerate() {
            match operators[idx] {
                "+" => sums[idx] += val,
                "*" => sums[idx] *= val,
                _ => {}
            }
        }
    }
    let ans = sums.iter().sum::<u64>();
    format!("{}", ans)
}

fn rotate_counter_clock_wise_90_extra_memory(matrix: &Vec<Vec<char>>) -> Vec<Vec<char>> {
    let m = matrix.len();
    let n = matrix[0].len();
    let mut new_matrix: Vec<Vec<char>> = Vec::with_capacity(n);
    for _ in 0..n {
        let mut temp_vec = Vec::with_capacity(m);
        temp_vec.resize(m, ' ');
        new_matrix.push(temp_vec);
    }

    for i in (0..n).rev() {
        for j in 0..m {
            // println!("{j} {i} -> {} {}", n - 1 - i, j);
            new_matrix[n - 1 - i][j] = matrix[j][i];
        }
    }
    new_matrix
}

fn part2(input: &str) -> String {
    let matrix = input
        .lines()
        .map(|v| v.chars().collect::<Vec<char>>())
        .collect::<Vec<Vec<char>>>();
    // println!("{matrix:?}");

    // // Rotate matrix 90 counter clockwise
    let rotated_matrix = rotate_counter_clock_wise_90_extra_memory(&matrix);

    let reformatted: Vec<_> = rotated_matrix
        .iter()
        .map(|v| {
            v.iter()
                .filter(|v| !v.is_whitespace())
                .map(|v| v.to_string())
                .collect::<Vec<String>>()
                .join("")
                .to_string()
        })
        .collect::<Vec<String>>();

    // println!("{reformatted:?}");
    // ["4", "431", "623+", "", "175", "581", "32*", "", "8", "248", "369+", "", "356", "24", "1*"]
    let mut result = 0;
    let mut queue: Vec<u64> = Vec::new();
    for v in reformatted {
        if v.is_empty() {
            continue;
        }
        // H
        if v.ends_with(['*', '+']) {
            let (number, operator) = v.split_at(v.len() - 1);
            let mut number = number.parse::<u64>().unwrap();
            for num in &queue {
                match operator {
                    "+" => number += num,
                    "*" => number *= num,
                    _ => {}
                }
            }
            result += number;
            queue.clear();
        } else {
            queue.push(v.parse::<u64>().unwrap());
        }
    }

    format!("{}", result)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  ";
        assert_eq!(part1(input), "4277556");
    }

    #[test]
    fn part2_example() {
        let input = "123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  ";
        assert_eq!(part2(input), "3263827");
    }

    #[test]
    fn counter_clockwise_rotation_test() {
        let matrix = vec![
            vec!['1', '2', '3'],
            vec!['4', '5', '6'],
            vec!['7', '8', '9'],
        ];

        let matrix2 = vec![
            vec!['1', '2', '3', '4'],
            vec!['5', '6', '7', '8'],
            vec!['9', '+', '-', '*'],
        ];

        assert_eq!(
            rotate_counter_clock_wise_90_extra_memory(&matrix),
            vec![
                vec!['3', '6', '9'],
                vec!['2', '5', '8'],
                vec!['1', '4', '7'],
            ]
        );
        assert_eq!(
            rotate_counter_clock_wise_90_extra_memory(&matrix2),
            vec![
                vec!['4', '8', '*'],
                vec!['3', '7', '-'],
                vec!['2', '6', '+'],
                vec!['1', '5', '9'],
            ]
        );
    }
}
