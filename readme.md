# Documentation for ScrapAll Functionality

## Overview

The `ScrapAll` function serves as the orchestrator for automating the scraping of essential stock trading data. It integrates multiple classes and services to fetch, process, and store various types of data related to stock trading activities. This documentation provides a detailed explanation of each component involved in the `ScrapAll` functionality, along with relevant code snippets.

## Functionality

The `ScrapAll` function performs the following tasks:

1. **Scrap Today's Floor Sheet**: Fetches today's floor sheet data from an external API, processes it, and stores it in the database using the `FloorSheetScrap` class.

2. **Scrap Top Buying and Selling Stocks for Each Company**: Iterates through all companies, scrapes the top buying and selling stocks data for each company, and stores it in the database using the `StockScrap` class.

3. **Scrap Top Holding Stocks for Each Company**: Iterates through all companies, scrapes the top holding stocks data for each company, and stores it in the database using the `StockScrap` class.

4. **Scrap Top Buying and Selling Stocks for Each Broker**: Fetches top buying and selling stocks data for each broker, and stores it in the database using the `BrokerFavScrap` class.

## Classes and Services

### ScrapAll Function

The `ScrapAll` function coordinates the scraping process by calling methods from other classes and services. Below is the code snippet for the `ScrapAll` function:

```typescript
import { FloorSheetScrap } from "./floorSheet.scrap";
import StockScrap from "./topStocks.scrap";
import BrokerFavScrap from "./brokerFavStock.scrap";
import { BrokerService } from "../broker/broker.service";
import { CompanyService } from "../company/company.service";

export const ScrapAll = async (): Promise<void> => {
  const floorSheetScrap = new FloorSheetScrap();
  await floorSheetScrap.scrapTodayFloorSheet();

  const stockScrap = new StockScrap();
  const companyService = new CompanyService();
  const companies: CompanyEntity[] = await companyService.findAll();

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    await stockScrap.scrapTopBuy(company.symbol);
    await stockScrap.scrapTopSell(company.symbol);
    await stockScrap.scrapTopHolding(company.symbol);
  }

  const brokerFavScrap = new BrokerFavScrap();
  const brokerService = new BrokerService();
  const brokers: BrokerDetails[] = await brokerService.findAll();

  for (let i = 0; i < brokers.length; i++) {
    const broker = brokers[i];
    await brokerFavScrap.scrapTopBuy(broker.brokerId);
    await brokerFavScrap.scrapTopSell(broker.brokerId);
  }
};
```

### FloorSheetScrap Class

The `FloorSheetScrap` class handles the scraping of today's floor sheet data. It fetches data from an external API, formats it, and stores it in the database. Here's the code snippet for the `FloorSheetScrap` class:

```typescript
import axios from "axios";
import { FloorSheetService } from "../floorsheet/floorSheet.service";

export class FloorSheetScrap {
  private readonly BASE_URL =
    "https://sarallagani.xyz/api/floorsheet/today?null=null&page=1&pageSize=3000000";
  private floorSheetService = new FloorSheetService();

  async scrapTodayFloorSheet(): Promise<void> {
    const data = await axios.get(this.BASE_URL, {
      headers: {
        Permission: "2021D@T@f@RSt6&%2-D@T@",
      },
    });
    const result = await this.formatData(data?.data?.data?.dataList);
    await this.floorSheetService.truncate();
    await this.createManyInChunks(result, 100); // Change the chunk size as needed
  }

  // Other methods omitted for brevity
}
```

### StockScrap Class

The `StockScrap` class handles the scraping of top buying, selling, and holding stocks data for each company. It interacts with services to fetch data and format it before storing it in the database. Below is the code snippet for the `StockScrap` class:

```typescript
import { FloorSheetService } from "../floorsheet/floorSheet.service";
import { BrokerService } from "../broker/broker.service";
import { CompanyService } from "../company/company.service";

export default class StockScrap {
  private floorSheetService = new FloorSheetService();
  private brokerService = new BrokerService();
  private companyService = new CompanyService();

  async scrapTopBuy(company: string): Promise<void> {
    // Method implementation
  }

  async scrapTopSell(company: string): Promise<void> {
    // Method implementation
  }

  async scrapTopHolding(company: string): Promise<void> {
    // Method implementation
  }

  // Other methods omitted for brevity
}
```

### BrokerFavScrap Class

The `BrokerFavScrap` class handles the scraping of top buying and selling stocks data for each broker. It interacts with services to fetch data and format it before storing it in the database. Below is the code snippet for the `BrokerFavScrap` class:

```typescript
import { FloorSheetService } from "../floorsheet/floorSheet.service";
import { BrokerService } from "../broker/broker.service";
import { CompanyService } from "../company/company.service";

export default class BrokerFavScrap {
  private floorSheetService = new FloorSheetService();
  private brokerService = new BrokerService();
  private companyService = new CompanyService();

  async scrapTopBuy(brokerId: number): Promise<any> {
    // Method implementation
  }

  async scrapTopSell(brokerId: number): Promise<any> {
    // Method implementation
  }

  // Other methods omitted for brevity
}
```

### Services

The `BrokerService`, `CompanyService`, and `FloorSheetService` are essential services responsible for managing broker, company, and floor sheet-related data, respectively. They handle database interactions and provide methods for data retrieval and manipulation.

## Usage

To utilize the `ScrapAll` functionality, simply call the `ScrapAll` function in your application. Ensure that all necessary dependencies are properly configured and that the database connection is established before invoking the function.

```typescript
import { ScrapAll } from "./scrapAll";

async function runScrapingProcess() {
  await ScrapAll();
}

runScrapingProcess();
```

`url example:http://localhost:5000/api/v1/top-buy?page=1&perPage=100&search=SGHC&dateRange[]=2024-02-07T00:00:00.000Z&dateRange[]=2024-02-08T00:00:00.000Z`
