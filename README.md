### **Introduction**  
Your revolutionary My Barista app is getting a lot of traction, and users are demanding a new feature: coffee recommendations.  
You decided to implement it as a backend service serving HTTP/JSON API, using your last fancy "hello world" NestJS app for starters. There is no need to worry about a persistent database at this point—startup world is full of risk, and you are ready to embrace it by relying on in-memory storage only.  

To bring any value to your wonderful users, you need to provide endpoints to:  
- Rate coffee brewed today  
- List previous ratings and previously rated coffee types  
- Receive recommendations of coffee types to brew today  

---

### **App requirements**  
Your app has to satisfy the requirements of 4 HTTP requests described below:  

#### **Endpoint to rate coffee type**  
- **Request:** `POST /ratings`  
- **Request body:** JSON in form of object:  
  ```json
  { "coffeeType": "coffee type to rate", "starRating": "3/5" }
  ```
- **HTTP status for success:** `201 Created`  
- **HTTP status for validation error:** `400 Bad Request`  
  - **Validation of coffeeType property:**  
    - Must be present in the request body  
  - **Validation of starRating property:**  
    - Must be present in the request body  
    - Must satisfy the format `"1/5"`, where the first integer is a number of stars given (min 1, max 5), and the second integer is always 5  
    - No extra whitespaces or other number formats (e.g., `"5/5"` is correct, but `"5.0 / 5.0"` is not)  

---

#### **Endpoint to list rated coffee types**  
- **Request:** `GET /ratings/coffee-types`  
- **HTTP status for success:** `200 OK`  
- **Response body:** JSON in form of array  
  ```json
  ["some rated coffee type", "another rated coffee type"]
  ```
- **Business logic:**  
  - All coffee types rated with `POST /ratings` should be included in the response body  
  - The resulting array should be empty (`[]`) if no coffee type was rated yet  
  - The resulting array should contain no duplicates  

---

#### **Endpoint to obtain rating of previously rated coffee type**  
- **Request:** `GET /ratings`  
- **Request URL query param:** `coffeeType`  
- **Response body:** JSON in form of object  
  ```json
  { "coffeeType": "previously rated coffee type", "starRating": "3/5" }
  ```
- **HTTP status for success:** `200 OK`  
- **HTTP status for validation error:** `400 Bad Request`  
- **HTTP status when requesting a coffee type that was not rated yet:** `400 Bad Request`  
- **Validation of `coffeeType` query param:**  
  - Must be present in the URL  
- **Business logic:**  
  - Rating given via `POST /ratings` can be retrieved using `GET /ratings`  
  - Returned rating should be the most recent one if multiple ratings exist for the same coffee type  
  - An error response should be returned if requesting the rating of a coffee type that was not rated yet, with the response body in the form:  
    ```json
    { "coffeeType": "not rated yet coffee type taken from query param" }
    ```

---

#### **Endpoint to recommend a coffee type for today**  
- **Request:** `GET /recommendation`  
- **Response body for success:** JSON in form of object  
  ```json
  { "coffeeType": "recommended coffee type" }
  ```
  - **HTTP status for success:** `200 OK`  
- **Response body for empty result:** JSON in form of object  
  ```json
  { "message": "NO_RECOMMENDATIONS_AVAILABLE" }
  ```
  - **HTTP status for empty result:** `200 OK`  
- **Business logic:**  
  - The recommended coffee type is calculated based on the most recent ratings only  
  - The most recently rated coffee type is **not included** in the recommendation  
  - Only coffee types rated with **4 or 5 stars** (`"4/5"` and `"5/5"`) are considered good enough to be recommended  
  - Among those, the **oldest rated** coffee type is recommended  
  - If no such coffee type exists, a response with the message `"NO_RECOMMENDATIONS_AVAILABLE"` is returned  

---
