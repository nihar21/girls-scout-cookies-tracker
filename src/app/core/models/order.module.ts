export interface Order {
    orderId: string;
    name: string;
    cookies: { [type: string]: number }; // Object with cookie types as keys and quantities as values
    totalAmount: number;
    isPaid: boolean;
}

// Example of a cookie object within an order:
// cookies: {
//     "Thin Mints": 3,
//     "Samoas": 2
//     // ... other cookie types
// }
