# MongoDB Queries

## Basic Query

### Searching by a property

```
{title: "The Godfather"}
```

### Searching by ID

```
{_id: ObjectId('65c1339bdd7b2655a6be4626')}
```

## Combined Query - Logical Operators

### $and

All the movies from year 2000 with the rate 8.5

```
{$and: [{year: '2000'}, {rate: '8.5'}]}
```

### $or

All the movies from 2000 or all the movies with rate 8.5

```
{$or: [{year: '2000'}, {rate: '8.5'}]}
```

### Greater than: $gt

### Greater than and equal: $gte

```
{rate: {$gte: '8.7'}}
{rate: {$gt: '8.7'}}
```

### Less than: $lt

### Less than and equal: $lte

```
{rate: {$lte: '8.0'}}
{rate: {$lt: '8.0'}}
```

### Not equal: $ne

All the movies in which the rate is not 9.0

```
{rate: {$ne: '9.0'}}
```

### Nor: $nor

Exclude movies from 2000 and movies where Sidney Lumet was the director

```
{$nor: [{year: '2000'},{director: 'Sidney Lumet'}]}
```

### Exists: $exists

```
{genre: {$exists: false}}
```

### Type: $type

```
{genre: {$type: "array"}}
```

## Projections

It allows us to specify which fields we want from the documents. We can make our queries faster by removing all the stuff we don't need!

We use `1` to say the want that field and `0` to exclude it:

The `_id` is always returned by default.

```
{title: 1, _id:0}
```

## Sort

We specify `1` to sort in an ascending order and `-1` to sort by descending.

```
{title: 1}
// or
{title: -1}
```

## Skip and Limit

Useful for pagination!
