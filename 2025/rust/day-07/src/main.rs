fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}

fn part1(input: &str) -> String {
    let mut matrix = input
        .lines()
        .map(|v| v.chars().collect::<Vec<char>>())
        .collect::<Vec<Vec<char>>>();

    let mut counter = 0;

    for i in 0..matrix.len() - 1 {
        let row = matrix[i].clone();
        for (idx, char) in row.iter().enumerate() {
            if *char == 'S' || *char == '|' {
                // Check if next row same idx is ^, if so split + 1
                if matrix[i + 1][idx] == '^' {
                    matrix[i + 1][idx - 1] = '|';
                    matrix[i + 1][idx + 1] = '|';
                    counter += 1;
                }
                // Flow down to next row
                if matrix[i + 1][idx] == '.' {
                    matrix[i + 1][idx] = '|';
                }
            }
        }
        // println!("{matrix:?}");
    }

    format!("{}", counter)
}

fn part2(input: &str) -> String {
    let len = input.lines().next().unwrap().len();
    let mut last_row = vec![0; len];
    // Keep track of all possbile paths
    input.lines().for_each(|line| {
        for (i, val) in line.chars().enumerate() {
            if val == 'S' {
                last_row[i] = 1;
            } else if val == '^' {
                if last_row[i] > 0 {
                    last_row[i - 1] += last_row[i];
                    last_row[i + 1] += last_row[i];
                    last_row[i] = 0;
                }
            }
        }
        // println!("{:?}", last_row)
    });

    format!("{}", last_row.iter().sum::<u64>())
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = ".......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............";
        assert_eq!(part1(input), "21");
    }

    #[test]
    fn part2_example() {
        let input = ".......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............";
        assert_eq!(part2(input), "40");
    }

    //     #[test]
    //     fn part2_example() {
    //         let input = "123 328  51 64
    //  45 64  387 23
    //   6 98  215 314
    // *   +   *   +  ";
    //         assert_eq!(part2(input), "3263827");
    //     }
}
