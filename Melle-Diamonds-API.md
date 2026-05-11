# Melle Diamonds API

**Base URL:** `https://uniglow-inventory-service-dev.caratlogic.com`
**Auth:** `Authorization: Bearer <token>` on every endpoint.
**Content type:** `application/json` unless stated otherwise.

---

## Shared TypeScript Types

```ts
export type Shape = 'RBC' | string;
export type Color = 'D-F' | 'GH' | 'HI' | string;
export type Clarity = 'I1' | 'SI1' | 'SI2' | 'VS' | 'VVS' | string;
export type Cut = 'Very Good' | string;
export type MelleCategory = 'BM' | string;

export interface MelleDiamond {
  _id: string;
  stockId: string;                // e.g. "UN400971" — server-generated
  shape: Shape;
  price: number;
  clarity: Clarity;
  cut: Cut;                       // server-derived / defaulted
  color: Color;
  avgPtr: number;                 // average points
  sieveMax: string;
  sieveMin: string;
  measurementMax: string;
  measurementMin: string;
  carat: number;                  // server-derived from avgPtr
  isLab: boolean;
  melleCategory: MelleCategory;
  __v: number;
  createdAt: string;              // ISO-8601
  updatedAt: string;              // ISO-8601
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> extends ApiSuccess<T[]> {
  pagination: Pagination;
}
```

---

## 1. Get All Melle Diamonds

`GET /api/melle-diamonds`

### Query Params

```ts
export interface ListMelleDiamondsQuery {
  page?: number;                              // default 1
  limit?: number;                             // default 10
  sortBy?: 'createdAt' | 'price' | 'carat' | 'avgPtr' | string;
  sortOrder?: 'asc' | 'desc';                 // default 'desc'
}
```

### cURL

```bash
curl -X GET "$BASE/api/melle-diamonds?page=1&limit=10&sortBy=createdAt&sortOrder=desc" \
  -H "Authorization: Bearer $TOKEN"
```

### Response 200

```ts
type ListMelleDiamondsResponse = PaginatedResponse<MelleDiamond>;
```

```json
{
  "success": true,
  "message": "Melle diamonds fetched successfully",
  "data": [
    {
      "_id": "69da2f38a7d87a014dfc6199",
      "stockId": "UN400971",
      "shape": "RBC",
      "price": 840,
      "clarity": "VVS",
      "cut": "Very Good",
      "color": "D-F",
      "avgPtr": 0.24,
      "sieveMax": "17.5",
      "sieveMin": "17",
      "measurementMax": "4,00",
      "measurementMin": "3,90",
      "carat": 0.0024,
      "isLab": false,
      "melleCategory": "BM",
      "__v": 0,
      "createdAt": "2026-04-11T11:23:36.961Z",
      "updatedAt": "2026-04-11T11:23:36.961Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 86,
    "totalRecords": 858,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 2. Search Melle Diamonds

`GET /api/melle-diamonds/search`

### Query Params

```ts
export interface SearchMelleDiamondsQuery {
  shape?: Shape;
  color?: Color;
  clarity?: Clarity;
  cut?: Cut;
  melleCategory?: MelleCategory;
  isLab?: boolean;                            // "true" | "false" as string
  price_MIN?: number;
  price_MAX?: number;
  avgPtr_MIN?: number;
  avgPtr_MAX?: number;
  carat_MIN?: number;
  carat_MAX?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### cURL

```bash
curl -X GET "$BASE/api/melle-diamonds/search?shape=RBC&color=D-F&clarity=SI1&price_MIN=100&price_MAX=600&isLab=false&melleCategory=BM" \
  -H "Authorization: Bearer $TOKEN"
```

### Response 200

```ts
type SearchMelleDiamondsResponse = ApiSuccess<MelleDiamond[]>;
```

```json
{
  "success": true,
  "message": "Melle diamond search completed successfully",
  "data": [
    {
      "_id": "69da2f38a7d87a014dfc6159",
      "stockId": "UN558200",
      "shape": "RBC",
      "price": 595,
      "clarity": "SI1",
      "cut": "Very Good",
      "color": "D-F",
      "avgPtr": 0.14,
      "sieveMax": "14.5",
      "sieveMin": "14",
      "measurementMax": "3.40",
      "measurementMin": "3.30",
      "carat": 0.0014,
      "isLab": false,
      "melleCategory": "BM",
      "__v": 0,
      "createdAt": "2026-04-11T11:23:36.959Z",
      "updatedAt": "2026-04-11T11:23:36.959Z"
    }
  ]
}
```

---

## 3. Get Melle Filter Options

`GET /api/melle-diamonds/filter-options`

No query params. Returns the distinct values + numeric ranges available to power filter UIs.

### cURL

```bash
curl -X GET "$BASE/api/melle-diamonds/filter-options" \
  -H "Authorization: Bearer $TOKEN"
```

### Response 200

```ts
export interface NumericRange {
  min: number;
  max: number;
}

export interface MelleFilterOptions {
  shapes: Shape[];
  colors: Color[];
  clarities: Clarity[];
  cuts: Cut[];
  melleCategories: MelleCategory[];
  isLabOptions: boolean[];
  priceRange: NumericRange;
  avgPtrRange: NumericRange;
  caratRange: NumericRange;
}

type FilterOptionsResponse = ApiSuccess<MelleFilterOptions>;
```

```json
{
  "success": true,
  "message": "Melle diamond filter options fetched successfully",
  "data": {
    "shapes": ["RBC"],
    "colors": ["D-F", "GH", "HI"],
    "clarities": ["I1", "SI1", "SI2", "VS", "VVS"],
    "cuts": ["Very Good"],
    "melleCategories": ["BM"],
    "isLabOptions": [true, false],
    "priceRange": { "min": 220, "max": 865 },
    "avgPtrRange": { "min": 0.002, "max": 0.25 },
    "caratRange": { "min": 0.00002, "max": 0.0025 }
  }
}
```

---

## 4. Get Melle Diamond By ID

`GET /api/melle-diamonds/:id`

### Path Params

| Param | Type   | Description                 |
| ----- | ------ | --------------------------- |
| `id`  | string | Mongo ObjectId of the item. |

### cURL

```bash
curl -X GET "$BASE/api/melle-diamonds/69da2f38a7d87a014dfc6199" \
  -H "Authorization: Bearer $TOKEN"
```

### Response 200

```ts
type GetMelleDiamondResponse = ApiSuccess<MelleDiamond>;
```

```json
{
  "success": true,
  "message": "Melle diamond fetched successfully",
  "data": {
    "_id": "69da2f38a7d87a014dfc6199",
    "stockId": "UN400971",
    "shape": "RBC",
    "price": 840,
    "clarity": "VVS",
    "cut": "Very Good",
    "color": "D-F",
    "avgPtr": 0.24,
    "sieveMax": "17.5",
    "sieveMin": "17",
    "measurementMax": "4,00",
    "measurementMin": "3,90",
    "carat": 0.0024,
    "isLab": false,
    "melleCategory": "BM",
    "__v": 0,
    "createdAt": "2026-04-11T11:23:36.961Z",
    "updatedAt": "2026-04-11T11:23:36.961Z"
  }
}
```

### Response 404

```json
{ "success": false, "message": "Melle diamond not found" }
```

---

## 5. Create Melle Diamond (Admin)

`POST /api/melle-diamonds`
Requires **admin** token.

### Request Body

```ts
export interface CreateMelleDiamondBody {
  shape: Shape;
  price: number;
  color: Color;
  clarity: Clarity;
  avgPtr: number;
  measurementMin: string;
  measurementMax: string;
  sieveMin: string;
  sieveMax: string;
  isLab: boolean;
  melleCategory: MelleCategory;
  cut?: Cut;                    // optional — server defaults to "Very Good"
}
```

Server-generated fields (do **not** send): `_id`, `stockId`, `carat`, `createdAt`, `updatedAt`, `__v`.

### cURL

```bash
curl -X POST "$BASE/api/melle-diamonds" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shape": "RBC",
    "price": 500,
    "color": "D-F",
    "clarity": "SI1",
    "avgPtr": 0.002,
    "measurementMin": "0.80",
    "measurementMax": "0.80",
    "sieveMin": "0000",
    "sieveMax": "000",
    "isLab": false,
    "melleCategory": "BM"
  }'
```

### Response 201

```ts
type CreateMelleDiamondResponse = ApiSuccess<MelleDiamond>;
```

```json
{
  "success": true,
  "message": "Melle diamond created successfully",
  "data": {
    "stockId": "UN325006",
    "shape": "RBC",
    "price": 500,
    "clarity": "SI1",
    "cut": "Very Good",
    "color": "D-F",
    "avgPtr": 0.002,
    "sieveMax": "000",
    "sieveMin": "0000",
    "measurementMax": "0.80",
    "measurementMin": "0.80",
    "carat": 0.00002,
    "isLab": false,
    "melleCategory": "BM",
    "_id": "69e294e19661452c7a2f62ea",
    "createdAt": "2026-04-17T20:15:29.671Z",
    "updatedAt": "2026-04-17T20:15:29.671Z",
    "__v": 0
  }
}
```

---

## 6. Import Melle Diamonds from Excel (Admin)

`POST /api/melle-diamonds/import`
Content-Type: **multipart/form-data**. Requires **admin** token.

### Form Data

```ts
export interface ImportMelleDiamondsForm {
  file: File;                        // .xlsx or .xls — required
  isLab: 'true' | 'false';           // string boolean
  melleCategory: MelleCategory;
}
```

### cURL

```bash
curl -X POST "$BASE/api/melle-diamonds/import" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -F "file=@/path/to/NATURAL_LOOSE_PRICES.xlsx" \
  -F "isLab=false" \
  -F "melleCategory=BM"
```

### Response 200 (inferred)

```ts
export interface ImportMelleDiamondsResponse {
  success: true;
  message: string;                   // e.g. "Melle diamonds imported successfully"
  data: {
    inserted: number;
    skipped?: number;
    errors?: Array<{ row: number; message: string }>;
  };
}
```

### Response 400 (observed — missing file)

```json
{ "success": false, "message": "An Excel file (.xlsx or .xls) is required" }
```

---

## 7. Update Melle Diamond (Admin)

`PUT /api/melle-diamonds/:id`
Requires **admin** token.

### Path Params

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| `id`  | string | Mongo ObjectId of the item.|

### Request Body

All fields optional — partial update.

```ts
export type UpdateMelleDiamondBody = Partial<CreateMelleDiamondBody>;
```

### cURL

```bash
curl -X PUT "$BASE/api/melle-diamonds/69da2f38a7d87a014dfc6199" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "price": 525, "clarity": "VS", "melleCategory": "BM" }'
```

### Response 200

```ts
type UpdateMelleDiamondResponse = ApiSuccess<MelleDiamond>;
```

```json
{
  "success": true,
  "message": "Melle diamond updated successfully",
  "data": {
    "_id": "69da2f38a7d87a014dfc6199",
    "stockId": "UN400971",
    "shape": "RBC",
    "price": 525,
    "clarity": "VS",
    "cut": "Very Good",
    "color": "D-F",
    "avgPtr": 0.24,
    "sieveMax": "17.5",
    "sieveMin": "17",
    "measurementMax": "4,00",
    "measurementMin": "3,90",
    "carat": 0.0024,
    "isLab": false,
    "melleCategory": "BM",
    "__v": 0,
    "createdAt": "2026-04-11T11:23:36.961Z",
    "updatedAt": "2026-04-17T20:15:33.988Z"
  }
}
```

---

## 8. Delete Melle Diamond (Admin)

`DELETE /api/melle-diamonds/:id`
Requires **admin** token.

### Path Params

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| `id`  | string | Mongo ObjectId of the item.|

### cURL

```bash
curl -X DELETE "$BASE/api/melle-diamonds/69da2f38a7d87a014dfc6199" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Response 200 (inferred)

```ts
export interface DeleteMelleDiamondResponse {
  success: true;
  message: string;                   // e.g. "Melle diamond deleted successfully"
  data?: { _id: string };
}
```

### Response 404 (observed)

```json
{ "success": false, "message": "Melle diamond not found" }
```

---

## Error Response Shape

All non-2xx responses follow:

```ts
export interface ApiError {
  success: false;
  message: string;
}
```

Common statuses:

| Status | Meaning                                  |
| ------ | ---------------------------------------- |
| 400    | Validation / bad payload (e.g. no file). |
| 401    | Missing / invalid token.                 |
| 403    | Non-admin trying admin endpoint.         |
| 404    | Record not found.                        |
| 500    | Server error.                            |
