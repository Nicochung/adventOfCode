use std::collections::HashSet;

use union_find_rs::prelude::*;

fn main() {
    let input1 = include_str!("input1.txt");
    println!("{}", part1(input1, 1000));

    let input2 = include_str!("input2.txt");
    println!("{}", part2(input2));
}

#[derive(Debug)]
struct JunctionBox {
    x: i64,
    y: i64,
    z: i64,
}

impl JunctionBox {
    fn distance_square(&self, other: &JunctionBox) -> i64 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        let dz = self.z - other.z;
        dx * dx + dy * dy + dz * dz
    }
}

fn part1(input: &str, connections: usize) -> String {
    let junction_boxes = input
        .lines()
        .map(|v| {
            let mut iter = v.trim().split(",");
            let x = iter.next().unwrap().parse::<i64>().unwrap();
            let y = iter.next().unwrap().parse::<i64>().unwrap();
            let z = iter.next().unwrap().parse::<i64>().unwrap();
            JunctionBox { x, y, z }
        })
        .collect::<Vec<JunctionBox>>();

    let mut distance_pairs = vec![];

    // Calc distance between all boxes pair
    for (i, box_a) in junction_boxes.iter().enumerate() {
        for (j, box_b) in junction_boxes[i + 1..].iter().enumerate() {
            let distance = box_a.distance_square(box_b);
            distance_pairs.push((distance, i, i + j + 1, box_a, box_b));
        }
    }
    // Sort or use a max-heap to get the top-k distances
    distance_pairs.sort_by(|a, b| a.0.cmp(&b.0));
    // println!("{:?}", distance_pairs);

    // Disjoint Set / Union-Find to find the final number of sets

    let mut sets: DisjointSets<usize> = DisjointSets::new();

    for i in 0..junction_boxes.len() {
        let _ = sets.make_set(i);
    }

    for i in 0..connections {
        let set1 = sets.find_set(&distance_pairs[i].1).unwrap();
        let set2 = sets.find_set(&distance_pairs[i].2).unwrap();
        // println!("{}: {:?} {set1} {set2}", i + 1, distance_pairs[i]);
        // Avoid assigning to the same set when they are already in the same set
        if set1 != set2 {
            let _ = sets.union(&distance_pairs[i].1, &distance_pairs[i].2);
        }
    }
    let mut sets = sets.into_iter().collect::<Vec<HashSet<usize>>>();
    sets.sort_by(|a, b| b.len().cmp(&a.len()));
    // println!("{:?}", sets);

    let mut counter = 1;

    // Multiple the size of 3 largest set
    for i in 0..3 {
        counter *= sets[i].len();
    }

    format!("{}", counter)
}

fn part2(input: &str) -> String {
    let junction_boxes = input
        .lines()
        .map(|v| {
            let mut iter = v.trim().split(",");
            let x = iter.next().unwrap().parse::<i64>().unwrap();
            let y = iter.next().unwrap().parse::<i64>().unwrap();
            let z = iter.next().unwrap().parse::<i64>().unwrap();
            JunctionBox { x, y, z }
        })
        .collect::<Vec<JunctionBox>>();

    let mut distance_pairs = vec![];

    // Calc distance between all boxes pair
    for (i, box_a) in junction_boxes.iter().enumerate() {
        for (j, box_b) in junction_boxes[i + 1..].iter().enumerate() {
            let distance = box_a.distance_square(box_b);
            distance_pairs.push((distance, i, i + j + 1, box_a, box_b));
        }
    }
    // Sort or use a max-heap to get the top-k distances
    distance_pairs.sort_by(|a, b| a.0.cmp(&b.0));
    // println!("{:?}", distance_pairs);

    // Disjoint Set / Union-Find to find the final number of sets

    let mut sets: DisjointSets<usize> = DisjointSets::new();

    for i in 0..junction_boxes.len() {
        let _ = sets.make_set(i);
    }
    let mut last_pair = (0, 0);

    for i in 0..distance_pairs.len() {
        let set1 = sets.find_set(&distance_pairs[i].1).unwrap();
        let set2 = sets.find_set(&distance_pairs[i].2).unwrap();
        // println!("{}: {:?} {set1} {set2}", i + 1, distance_pairs[i]);
        // Avoid assigning to the same set when they are already in the same set
        if set1 != set2 {
            let _ = sets.union(&distance_pairs[i].1, &distance_pairs[i].2);
            last_pair = (distance_pairs[i].3.x, distance_pairs[i].4.x);
        }
    }

    // println!("{:?}", sets);

    format!("{}", last_pair.0 * last_pair.1)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn part1_example() {
        let input = "162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689";
        assert_eq!(part1(input, 10), "40");
    }

    #[test]
    fn part2_example() {
        let input = "162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689";
        assert_eq!(part2(input), "25272");
    }
}
