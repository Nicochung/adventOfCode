fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}
const EIGHT_DIRS: [[i32; 2]; 8] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
];

fn remove_roll(diagram: Vec<Vec<char>>) -> (u32, Vec<Vec<char>>) {
    let mut modified = diagram.clone();

    let mut result = 0;

    for (i, row) in diagram.iter().enumerate() {
        for (j, char) in row.iter().enumerate() {
            if *char == '.' {
                continue;
            }
            // Check if less than 4 '@' in 8-dirs
            let mut count = 0;
            for [dy, dx] in EIGHT_DIRS {
                let x = i as i32 + dx;
                let y = j as i32 + dy;

                if x < 0 || x >= diagram.len() as i32 || y < 0 || y >= row.len() as i32 {
                    continue;
                }
                if diagram[x as usize][y as usize] == '@' {
                    count += 1;
                }
            }
            if count < 4 {
                result += 1;
                modified[i][j] = '.';
            }
        }
    }

    (result, modified)
}

fn part1(input: &str) -> u32 {
    let diagram: Vec<Vec<char>> = input
        .lines()
        .map(|row| row.chars().collect::<Vec<char>>())
        .collect();

    let (result, _) = remove_roll(diagram);
    result
}

fn part2(input: &str) -> u32 {
    let mut result = 0;
    let diagram: Vec<Vec<char>> = input
        .lines()
        .map(|row| row.chars().collect::<Vec<char>>())
        .collect();
    let removed = remove_roll(diagram);
    let mut cnt = removed.0;
    let mut copied = removed.1;
    result += cnt;
    while cnt != 0 {
        let removed = remove_roll(copied.clone());
        cnt = removed.0;
        copied = removed.1;
        result += cnt;
    }

    result
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.";
        assert_eq!(part1(input), 13);
    }

    #[test]
    fn part2_example() {
        let input = "..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.";
        assert_eq!(part2(input), 43);
    }
}
