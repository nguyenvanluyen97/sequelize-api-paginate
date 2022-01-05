# sequelize-api-paginate

Sequelize paging for API. Quickly and simple to use

## Install

    npm install sequelize-api-paginate

## Usage

```js
const sequelizeApiPaginate = require("sequelize-api-paginate");
```

## Send a request

With all the above in place, you can now send a GET request that includes a sort/filter/page query. An example:

```js
GET /GetPosts

?sortField=      LikeCount                               // sort by likes
?sortOrder=      desc,asc                                // sort by descending or ascending
&filters=        LikeCount>10, Title@=awesome title,     // filter to posts with more than 10 likes, and a title that contains the phrase "awesome title"
&currentPage=    1                                       // get the first page...
&pageSize=       10                                      // ...which contains 10 posts
```

More formally:

- `sortField` is a comma-delimited ordered list of property names to sort by
- `filters` is a comma-delimited list of `{Name}{Operator}{Value}` where
  - `{Name}` is the name of a property with the Sieve attribute or the name of a custom filter method for TEntity
    - You can also have multiple names (for OR logic) by enclosing them in brackets and using a pipe delimiter, eg. `(LikeCount|CommentCount)>10` asks if `LikeCount` or `CommentCount` is `>10`
  - `{Operator}` is one of the [Operators](#operators)
  - `{Value}` is the value to use for filtering
    - You can also have multiple values (for OR logic) by using a pipe delimiter, eg. `Title@=new|hot` will return posts with titles that contain the text "`new`" or "`hot`"
- `currentPage` is the number of page to return
- `pageSize` is the number of items returned per page

## Operators

| Operator | Meaning                              | Example                               |
| -------- | ------------------------------------ | ------------------------------------- |
| `==`     | Equals                               |                                       |
| `!=`     | Not equals                           |                                       |
| `>`      | Greater than                         |                                       |
| `<`      | Less than                            |                                       |
| `>=`     | Greater than or equal to             |                                       |
| `<=`     | Less than or equal to                |                                       |
| `@=`     | Contains                             |                                       |
| `_=`     | Starts with                          |                                       |
| `!@=`    | Does not Contains                    |                                       |
| `!_=`    | Does not Starts with                 |                                       |
| `[]`     | Only datetime, date between two date | `created_at[](2021/11/05-2021/11/12)` |

## Example

Add `sequelizeApiPaginate` for your API like that:

```js
router.get(
  "/listUsers",
  sequelizeApiPaginate.middle,
  async function (req, res, next) {
    //Paging with default query in library
    let includes = [];
    let hierarchy = false;
    let raw = true;
    let nest = true;

    var listUserAfterPaging = await sequelizeApiPaginate.query(
      model.User,
      req.payload,
      includes, //not required,
      hierarchy, //not required
      raw, //not required
      nest //not required
    );

    res.json({ success: true, contents: listUserAfterPaging });
  }
);
```

For middleware it auto generate payload base on params pass in.

The `Params` like that:

```js
const payload = {
  pageSize: req.query.pageSize || null, //Default: 10
  sortField: req.query.sortField || null, //Default: 1
  sortOrder: req.query.sortOrder || null,
  currentPage: req.query.currentPage || null, //Default: 1
  filters: req.query.filters || null,
};
```

Example call `API` with `Payload`:

```js
const payload = {
  pageSize: 3, //Default: 10
  sortField: "created", //Default: 1
  sortOrder: "desc",
  currentPage: 1,
  filters: "gender==1",
};
```

Endpoint of API like that:

`http://localhost:3000/listUsers?currentPage=1&pageSize=3&sortField=created&sortOrder=desc&filters=gender==1`

The `Response` like that:

```js
{
    success: true,
    contents: {
        count: 20,
        rows: {
            {
                id: 'Mash Melon',
                gender: 1,
                age: 32
            },
             {
                id: 'John Kavas',
                gender: 1,
                age: 16
            },
             {
                id: 'Matric Eric',
                gender: 1,
                age: 23
            }
        },
        totalPages: 7,
        currentPage: 1
    }
}
```

## Noted

Please report bug to be fixed~ Many thanks all
