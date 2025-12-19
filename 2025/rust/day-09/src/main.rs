use std::cmp;
use std::collections::HashSet;

fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}

#[derive(Debug, Eq, Hash, PartialEq)]
struct Point {
    x: i64,
    y: i64,
}

impl Point {
    fn area(&self, other: &Point) -> i64 {
        let dx = self.x - other.x + 1;
        let dy = self.y - other.y + 1;
        dx.abs() * dy.abs()
    }
}

fn part1(input: &str) -> String {
    let points = input
        .lines()
        .map(|v| {
            let mut iter = v.trim().split(",");
            let x = iter.next().unwrap().parse::<i64>().unwrap();
            let y = iter.next().unwrap().parse::<i64>().unwrap();
            Point { x, y }
        })
        .collect::<Vec<Point>>();

    let mut max_area = 0;

    // Calc distance between all boxes pair
    for (i, point_a) in points.iter().enumerate() {
        for (j, point_b) in points[i + 1..].iter().enumerate() {
            let area = point_a.area(point_b);
            max_area = cmp::max(area, max_area);
        }
    }

    format!("{}", max_area)
}

fn part2(input: &str) -> String {
    todo!()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3";
        assert_eq!(part1(input), "50");
    }

    #[test]
    fn part2_example() {
        let input = "7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3";
        assert_eq!(part2(input), "24");
    }
}
