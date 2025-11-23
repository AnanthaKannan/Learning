## Call
* call means ``to buy the right to purchase the underlying asset at a specified price within a specified time period``.

## Put
* put means ``to buy the right to sell the underlying asset at a specified price within a specified time period``.

## Example
* An investor buys a call option on stock XYZ with a strike price of $50, expiring in three months. If the stock price rises to $70, the investor can exercise the option to buy the stock at $50, making a profit of $20 per share (minus the cost of the option). Conversely, if the stock price falls below $50, the investor can choose not to exercise the option and only loses the premium paid for the option.
* An investor buys a put option on stock ABC with a strike price of $30, expiring in two months. If the stock price drops to $20, the investor can exercise the option to sell the stock at $30, making a profit of $10 per share (minus the cost of the option). If the stock price rises above $30, the investor can choose not to exercise the option and only loses the premium paid for the option.

## What is peremium?
* Premium is the price paid by the buyer to the seller to acquire the option contract. It is determined by various factors including the underlying asset's price, strike price, time until expiration, volatility, and interest rates. The premium compensates the seller for the risk they take on by granting the option.

## what is buy call option and sell call option?
* Buying a call option gives the buyer the right to purchase the underlying asset at the strike price before the option expires. The buyer profits if the asset's price rises above the strike price plus the premium paid.
* Selling a call option (also known as writing a call) obligates the seller to sell the underlying asset at the strike price if the buyer chooses to exercise the option. The seller profits from the premium received but faces potential losses if the asset's price rises significantly above the strike price.


## Notes
* Longcall in uptrend market
* Shortcall in downtrend market

---
* What is Call & Put
* How premiums work
* Strike price, Lot size
* ITM/ATM/OTM
* Option buying vs. selling
* Greeks (Delta, Gamma, Theta, Vega)
* Intraday option strategies
* Risk management (very important!)
* How to practice safely

## IV and EV
* OTM - Intrinsic Value = 0, Premium = Time Value
* ATM - Intrinsic Value = 0, Premium = Time Value
* ITM - Intrinsic Value > 0, Premium = Intrinsic Value + Time Value

## 
Premium = Intrinsic Value + Time Value(Extrinsic Value)
* Intrinsic Value = Current Price - Strike Price
* Time Value = Premium - Intrinsic Value
### HOW TO CALCULATE IV AND EV
* Current Price = 24609
* Strike Price = 24500
* Premium = 200
* Intrinsic Value = 24609 - 24500 = 109
* Time Value = 200 - 109 = 91
* IV = 109
* EV = 91

## Option Buy OTM Example of Loss and Profit scenario
* Current Price = 24609
* Strike Price = 24700 (OTM)
* Premium = 150
### SCENARIO 1: Price at Expiry = 24750 (Loss Scenario)
* Intrinsic Value = 24750 - 24700 = 50
* Time Value = 0 (at expiry)
* Total Value at Expiry = 50 + 0 = 50
* Net Profit/Loss = Total Value at Expiry - Premium = 50 - 150 = -100 (Loss)
### SCENARIO 2: Price at Expiry = 24800 (Profit Scenario)
* Intrinsic Value = 24800 - 24700 = 100
* Time Value = 0 (at expiry)
* Total Value at Expiry = 100 + 0 = 100
* Net Profit/Loss = Total Value at Expiry - Premium = 100 - 150 = -50 (Loss)
### SCENARIO 3: Price at Expiry = 24900 (Profit Scenario)
* Intrinsic Value = 24900 - 24700 = 200
* Time Value = 0 (at expiry)
* Total Value at Expiry = 200 + 0 = 200
* Net Profit/Loss = Total Value at Expiry - Premium = 200 - 150 = 50 (Profit)
* Breakeven Point = Strike Price + Premium = 24700 + 150 = 24850
* Summary: In this example, the option buyer incurs losses if the price at expiry is below 24850 and starts making profits only when the price exceeds this breakeven point.

## Option Buy ITM Example of Profit scenario
* Current Price = 24609
* Strike Price = 24500 (ITM)
* Premium = 200
* Intrinsic Value = 24609 - 24500 = 109
* Time Value = 200 - 109 = 91
* IV = 109
* EV = 91
* Breakeven Point = Strike Price + Premium = 24500 + 200 = 24700

### SCENARIO 1: Price at Expiry = 24650 (Profit Scenario)
* Intrinsic Value = 24650 - 24500 = 150
* Time Value = 0 (at expiry)
* Total Value at Expiry = 150 + 0 = 150
* Net Profit/Loss = Total Value at Expiry - Premium = 150 - 200 = -50 (Loss)
### SCENARIO 2: Price at Expiry = 24750 (Profit Scenario)
* Intrinsic Value = 24750 - 24500 = 250
* Time Value = 0 (at expiry)
* Total Value at Expiry = 250 + 0 = 250
* Net Profit/Loss = Total Value at Expiry - Premium = 250 - 200 = 50 (Profit)
### SCENARIO 3: Price at Expiry = 24800 (Profit Scenario)
* Intrinsic Value = 24800 - 24500 = 300
* Time Value = 0 (at expiry)
* Total Value at Expiry = 300 + 0 = 300
* Net Profit/Loss = Total Value at Expiry - Premium = 300 - 200 = 100 (Profit)
* Summary: In this example, the option buyer incurs a loss if the price at expiry is below 24700 and starts making profits only when the price exceeds this breakeven point.

## Option Buy ATM Example of Profit and Loss scenario
* Current Price = 24609
* Strike Price = 24600 (ATM)
* Premium = 180
* Breakeven Point = Strike Price + Premium = 24600 + 180 = 24780
### SCENARIO 1: Price at Expiry = 24650 (Loss Scenario)
* Intrinsic Value = 24650 - 24600 = 50
* Time Value = 0 (at expiry)
* Total Value at Expiry = 50 + 0 = 50
* Net Profit/Loss = Total Value at Expiry - Premium = 50 - 180 = -130 (Loss)
### SCENARIO 2: Price at Expiry = 24750 (Loss Scenario)
* Intrinsic Value = 24750 - 24600 = 150
* Time Value = 0 (at expiry)
* Total Value at Expiry = 150 + 0 = 150
* Net Profit/Loss = Total Value at Expiry - Premium = 150 - 180 = -30 (Loss)
### SCENARIO 3: Price at Expiry = 24800 (Profit Scenario)
* Intrinsic Value = 24800 - 24600 = 200
* Time Value = 0 (at expiry)
* Total Value at Expiry = 200 + 0 = 200
* Net Profit/Loss = Total Value at Expiry - Premium = 200 - 180 = 20 (Profit)
* Summary: In this example, the option buyer incurs losses if the price at expiry is below 24780 and starts making profits only when the price exceeds this breakeven point.

---
## Option Selling
## Option Sell OTM Example of Profit and Loss scenario
* Current Price = 24609
* Strike Price = 24700 (OTM)
* Premium = 150
* Breakeven Point = Strike Price + Premium = 24700 + 150 = 24850
### SCENARIO 1: Price at Expiry = 24750 (Profit Scenario)
* Intrinsic Value = 24750 - 24700 = 50
* Time Value = 0 (at expiry)
* Total Value at Expiry = 50 + 0 = 50
* Net Profit/Loss = Premium - Total Value at Expiry = 150 - 50 = 100 (Profit)