fn main() {
    let input1 = include_str!("input1.txt");
    let input2 = include_str!("input2.txt");
    println!("{}", part1(input1));
    println!("{}", part2(input2));
}

fn part1(input: &str) -> i32 {
    let mut dial = 50;
    let mut cnt = 0;
    // println!("The dial starts at 50");
    input.lines().for_each(|v| {
        let (direction, rotation) = v.split_at(1);
        let rotation: i32 = rotation.parse().unwrap();
        let rotation = rotation % 100;
        let direction = match direction {
            "L" => -1,
            "R" => 1,
            _ => 1,
        };
        dial += rotation * direction;
        if dial < 0 {
            dial += 100;
        } else if dial >= 100 {
            dial -= 100;
        }
        // println!("The dial is rotated {v} to point at {dial}");
        if dial == 0 {
            cnt += 1;
        }
    });
    cnt
}

fn part2(input: &str) -> i32 {
    let mut dial = 50;
    let mut cnt = 0;
    // println!("The dial starts at 50");
    input.lines().for_each(|v| {
        let (direction, rotation) = v.split_at(1);
        let rotation: i32 = rotation.parse().unwrap();
        let direction = match direction {
            "L" => -1,
            "R" => 1,
            _ => 1,
        };
        let complete_rotation = if rotation >= 100 { rotation / 100 } else { 0 };
        cnt += complete_rotation;
        let prev = dial;
        dial += (rotation % 100) * direction;
        if dial < 0 {
            if prev != 0 {
                cnt += 1;
            }
            dial += 100;
        } else if dial > 100 {
            if prev != 0 {
                cnt += 1;
            }
            dial -= 100;
        } else if dial == 100 {
            dial = 0;
        }
        if dial == 0 {
            cnt += 1;
        }
        // println!("The dial is rotated {v} to point at {dial} {cnt}");
    });
    cnt
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "L68
L30
R48
L5
R60
L55
L1
L99
R14
L82";
        assert_eq!(part1(input), 3);
    }

    #[test]
    fn part2_example() {
        let input = "L68
L30
R48
L5
R60
L55
L1
L99
R14
L82";
        assert_eq!(part2(input), 6);
    }
}
