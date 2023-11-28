# Customer to Audiences Workflow Example

The Workflow in this project simulates Customers being pushed to marketing channels, Mailchimp, Google Ads, Meta Ads.

## How it works?

```mermaid
flowchart TB
	transformdata(Transform Data)
	
	subgraph parallelwyIV [Parallel]
	
	addsubscribertomailchimp(Add Subscriber To Mailchimp)
	addsubscribertogoogleads(Add Subscriber To Google Ads)
	addsubscribertometaads(Add Subscriber To Meta Ads)
	end
	

	transformdata --> addsubscribertomailchimp
		
	transformdata --> addsubscribertogoogleads
		
	transformdata --> addsubscribertometaads
```


### High-level overview

- Listen to Customer created event
- Transform Customer data to fit audience destinations
- Send Customer data to Mailchimp
- Send Customer data to Google Ads
- Send Customer data to Meta Ads
