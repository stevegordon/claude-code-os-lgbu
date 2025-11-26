# **🚀 Mastering Personalized Outbound at Scale: The Clay Approach**

At Clay, we've become synonymous with scaling personalized outbound campaigns. While there are countless ways to approach this challenge, we've distilled our experience from thousands of successful GTM operators into a proven, effective strategy. Let's dive into the core elements that have made Clay the go-to platform for personalized outreach at scale.

### **🎯 The Blueprint for Personalized Outbound Success**

Our approach revolves around five key steps that form the backbone of any successful personalized outbound campaign:

1. Refining Your Ideal Customer Profile (ICP)  
2. Data Gathering and Prospect Identification  
3. Targeted Data Enrichment  
4. AI-Powered Personalized Snippet Generation  
5. Seamless Integration with Email Sequencers and CRMs

This methodology has been battle-tested across diverse industries and company sizes, consistently delivering results that drive growth and engagement.

### **🔍 The Critical Importance of a Well-Defined ICP**

One of the most common pitfalls we see is companies casting too wide a net with their ICP. It's tempting to define your ICP as broadly as possible, encompassing your entire Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM). However, this approach often leads to diluted messaging and ineffective outreach.

Let's take Clay's own journey as an example. For years, we positioned ourselves as a "spreadsheet with APIs," capable of automating virtually anything. While this was technically true, it didn't resonate as strongly with potential customers as we'd hoped. Our breakthrough came when we narrowed our focus to automating go-to-market strategies, with a particular emphasis on outbound scaling.

This laser-focused approach allowed us to communicate our value proposition more clearly, target the right audience, and fuel significant growth. As we've expanded, we've been able to incorporate additional use cases like inbound marketing and CRM enrichment, but our initial niche focus was crucial to our success.

### **🎨 Crafting Your Precision ICP**

When defining your ICP, it's essential to look beyond broad categories. Yes, you might be able to service all software companies, law firms, or dental offices, but your true ICP is a subset of your SOM – those customers who are most likely to benefit from and adopt your product today.

Ask yourself:

* What specific problems do these customers face?  
* Where are they located?  
* Who influences their decisions?  
* What unique characteristics define them?

The more precisely you can answer these questions, the more effectively you can tailor your outreach, messaging, and ultimately, your product or service offerings.

### **🌟 Embracing Specificity for Greater Impact**

By honing in on a highly specific ICP, you unlock the ability to create hyper-targeted outreach campaigns. This specificity allows you to:

1. Craft more relevant and compelling messaging  
2. Develop deeper insights into your customers' needs and pain points  
3. Tailor your product or service offerings more precisely  
4. Build stronger, more meaningful relationships with your customers

Remember, starting with a narrow focus doesn't limit your long-term potential. Instead, it provides a solid foundation for growth, allowing you to expand your reach methodically and strategically as you prove your value in your initial niche.

### **🏁 Ready to Scale Your Outbound?**

With this strategic framework in mind, you're well-equipped to begin your journey into scaling personalized outbound with Clay. In the following sections, we'll dive deeper into each step of the process, providing you with actionable insights and best practices to supercharge your outreach efforts.

Stay tuned as we explore how to leverage Clay's powerful features to refine your ICP, gather and enrich prospect data, generate AI-powered personalized snippets, and seamlessly integrate with your existing tech stack. Let's unlock the full potential of your outbound strategy and drive unprecedented growth for your business.

# **Enriching Companies (Waterfalls) 🌊**

*Note: this lesson also appears in Clay 101, Automated Inbound, and CRM Enrichment, so feel free to skim or skip if you've already seen it somewhere else*  
*‍*

### **💪 Using Waterfalls for Data Enrichment Superpowers**

Once you’ve gotten your base list of Company Data into Clay, it’s time to augment that list with everything else you need to get razor sharp on your ICP, and how you’re going to reach out to them.

At the company level, that data most often looks like recent news, tech stack, funding, revenue, headcount, and more. Really any technographic or firmographic data that will either help you better qualify your leads, or better personalize your messaging. ‍

### **🧩 Data Enrichment is Just a Digital Puzzle** 

On first encounter, data enrichment can feel incredibly daunting. While you might know that you want to grab tech stack and revenue, you may not know how to programmatically get company websites or social URLs if your list doesn’t have them right off the bat.

Luckily, because we’re starting with a Find Companies search, we already have everything we need to be successful data superheroes.

But in case you’re ever feeling stuck on a specific data enrichment puzzle, just remember that all you really need to do is first find your corner pieces. Once you’ve found your corner pieces you can round out the edge with waterfalls, and then use AI Web Scraping (Claygent) to try and fill in the trickier center parts of the picture.

For companies, your corner data pieces are going to be domain and company social URL. Once you have those two pieces, you can use any other company enrichment waterfall to get whatever data you need.

For people, your corner data pieces are going to be full\_name and contact social URL. But we’ll dig deeper into people in a later lesson. 

### **‍🤔 How Do Waterfalls Work?** 

Now that you know you can access almost any of the waterfall enrichments from your corner data pieces, it’s time to understand … what actually *is* a waterfall? 

‍

In short, a waterfall is an intelligent way to get *only* the data that you need on a row by row basis from each provider. In the pre-waterfall era, it was common practice for a revenue team to have subscriptions to between 6-12 different data providers. When you’re paying that much money for data, you want to be as frugal as possible.

The best sales teams would upload their lead lists CSVs to the first data provider, then download to a google sheet, and use VLOOKUP magic to filter down to only the percentage of the list that *wasn’t* found from the first provider. From there, they then re downloaded the new CSV from the google sheet, uploaded it to the second provider, got their results, and then rinsed and repeated for up to a dozen different providers.

Waterfalls take that entire manual process (faulty, often inaccurate, and no matter what \- time consuming) and automate each step along the way. Let’s say we’re trying to obtain Funding Stage from our list of companies. In the Funding Stage waterfall shown below, we’ll *first* try to get that data from Intellizence. If we find the data from Intellizence, the rest of the providers won’t run. If we *don’t* find the data from Intellizence, then we’ll try Dealroom. Then Harmonic. Then Owler. Then Pitchbook. 

*Waterfalls help you maximize data coverage while minimizing data costs. You can have it all.*

### **🤔 Understanding Waterfall Results**

Once we run the fundraising waterfall, we’ll see a beautiful cascade of our waterfall data across the 5 providers we ran it with.

There are a few edge cases to waterfalls worth noting. First is that while the enrichment might be successful, if it doesn’t have the data point that we want – we’ll still waterfall to the next provider, as you can see happening in row 2 below.

Looking at your provider columns is the quickest way to understand how a waterfall is working, but ultimately, all the providers will feed their data into one final result column for you to use in the rest of your clay table. 

‍

*With Intellizence alone, we would have 0% coverage. With Dealroom we get 70%. With Intellizence, Dealroom, and Harmonic, we reach the mythical 100%*

Now that we’ve got funding stage for these companies, we could repeat this process with any other data point that’s important to our strategy. Revenue, Tech Stack, Headcount, just to name a few.

Once we’ve gotten the enriched company data that we need \- it’s finally time to Find People. 

# **🫂 Supercharging Your People Data with Clay: Waterfalls Pt. 2**

*Note: this lesson also appears in Clay 101, Automated Inbound, and CRM Enrichment, so feel free to skim or skip if you've already seen it somewhere else*‍

Now that you’ve gotten your list of people, it’s time to pull out your waterfall skills again to enrich your contact data.

Without basic contact information (at least LinkedIn profile and/or email), your contacts are essentially valueless. On top of that, you’ll need to go the extra mile when it comes to contact research if you really want to stand out in your messaging. In this guide, we’ll explore how to make the most of your contact data in Clay.

### **‍🏢 Pulling New Company Data into Your Table**

First things first, we want to access all that valuable company data we’ve already enriched. Maybe you want to personalize your messages based on tech stack, or recent employee growth.

This process is simple. Whenever you add new company data to your company table, you’ll just rerun the lookup in your people table. This process pulls the enriched company data into your people table, ensuring you have a comprehensive view of each contact's company contexts

By taking this approach, you're not only saving on data credits but also creating a more integrated dataset that combines individual and company information seamlessly.

*You can always rerun the second column linked to the company table to refresh*

### **🌊 The Power of People Data Waterfalls**

Just like with companies, we’re now going to use Waterfalls to maximize our coverage while minimizing our cost across 10+ providers to get contact data. We’ll start with email data \- one of the most powerful waterfalls in Clay.

By default, you'll have access to six providers in your email waterfall. But here's where it gets interesting: you can customize your waterfall by adding more providers to maximize your email coverage. This flexibility allows you to tailor your data enrichment process to your specific needs and preferences.

Remember the puzzle-building metaphor we discussed earlier? It applies here too. To access crucial information like work email or LinkedIn URL, you'll need your "corner pieces." For people data, these corner pieces are typically the full name and LinkedIn profile URL. Once you have these, along with company domain and company LinkedIn URL, you've unlocked access to a treasure trove of integrations and data points.

‍

*Example of setting up an email enrichment waterfall with multiple providers.*

### **✉️ Email Validation: Ensuring Quality Data**

Clay’s email waterfalls go one step further by including email validation in the waterfall process. By default, we use ZeroBounce, a best-in-class validation service, but you have the flexibility to choose a different provider if you prefer.

Understanding how Clay marks emails as valid or invalid is crucial. By default, catch-all emails are returned as valid. While these are often real emails, there's some uncertainty about whether they belong to the specific individual or if they're aliases. If you want to be more conservative in your approach, you can enable the "only mark safe to send" option, which will exclude catch-all emails from your valid email list.

‍

*Configuring your email validation provider for your waterfall*

### **🏊🏽‍♂️ Diving Deeper into Email Waterfalls**

As you run your email waterfall, you'll see results populate from various providers. The final validated emails will appear in the last column of your table. It's worth noting that while the validation columns aren't displayed by default (to keep your table tidy), they do exist behind the scenes.

If you're curious about the validation process, you can unhide these columns to see how ZeroBounce (or your chosen validator) is working its magic. This transparency allows you to understand why certain emails make it to the final column while others don't.

In some cases, you might notice that the waterfall continues running even after finding an email. This usually indicates that an email was found by a data provider but failed the validation check. It's this attention to detail that ensures you're working with the highest quality data possible.

‍

*The results of an email waterfall process.*

### **🔢 Beyond Email: Expanding Your People Data**

While email is often the star of the show, Clay's waterfalls can enrich your people data in numerous other ways. You can gather phone numbers, social media profiles, GitHub URLs, and much more. The possibilities are vast, allowing you to build a comprehensive profile of each contact in your database.

For those looking to go even further, Clay offers additional tools like Claygent for web scraping and integrations with Google searches. These advanced features open up new avenues for data enrichment, helping you uncover those hard-to-find details that can make all the difference in your outreach efforts. We’ll cover those in some later lessons in this course \- so don’t worry, it’s coming up\!

# **🧠 Unlocking the Power of AI Formulas in Clay**

*Note: this lesson also appears in Clay 101, Automated Inbound, and CRM Enrichment, so feel free to skim or skip if you've already seen it somewhere else*‍

This might be one of the most important lessons in this course \- because it’s *key* to maximizing the value that Clay provides while minimizing your costs.

AI formulas are credit-free ways to get AI to help you generate custom code in your table that can format, clean, and reshape your data exactly how you want it. We can’t tell you how many times we see users using the AI integration in place of an AI formula in a large table, which can save you hundreds, or thousands of credits.

Conditional runs (which make use of AI formulas\!) are how you ensure that you only run enrichments on rows that meet your data criteria. For example, you may only want to run a personal email waterfall for rows where a work email was not found (vs. running personal emails for *all* rows). That’s where condition runs come into play.

Let’s dig in. 

### **‍💡 The Beauty of AI Formulas**

When you use enrichments like the base enriched person from profile action, you gain access to a wealth of information. This includes work experience, job titles, education history, certifications, and even volunteering experience. However, the real magic happens when you start using AI formulas to extract specific insights from this data.

Let's say you want to know the total number of educational experiences for each person in your table. Instead of manually counting or writing complex formulas, you can use an AI formula. Here's how:

1. Choose "Ask question about items with AI" from the column options.  
2. Use the formula option and prompt the AI to count the total number of experiences.  
3. The AI will generate the appropriate code to give you the desired output.

You can apply this same principle to count job experiences, concatenate company names, or string together job titles. The possibilities are nearly endless.

*Using AI formulas to extract all of a contact’s experience from a social profile*

### **🔧 Troubleshooting AI Formulas**

Sometimes, the AI might not give you exactly what you're looking for on the first try. Don't worry – this is normal and part of the process. You can iterate on your prompts, adjust the wording, or even directly modify the generated code to get the results you need. Remember, the preview feature is your friend here, helping you ensure you're getting the right data before applying the formula.

### **‍🔀 Mastering Conditional Runs in Clay**

Conditional runs are another powerful feature in Clay that can help you optimize your data enrichment process and save credits. Let's explore how they work and how you can leverage them effectively.‍

### **🌊 Revisiting Waterfalls, the Original Conditional Run**

You've actually already used conditional runs without even knowing it … because conditional runs are at the core of what waterfalls do\! Waterfalls set up a series of enrichments that run in a specific order, with each subsequent enrichment only running if the previous ones didn't return results. This is achieved through conditional formulas running in the background. But you can modify these conditional formulas however you want to build the workflows of your dreams. ‍

### **🛠️ Building Custom Conditional Runs**

The real power comes when you start creating your own custom conditional runs. For example, let's say you want to find personal emails only for contacts where you couldn't find a work email. Here's how you might set that up:

1. Add a new enrichment for personal emails.  
2. Click on "Run Settings" and then "Conditional Run."  
3. Use the AI to generate a formula that only runs if the validated work email is blank.

This ensures you're not wasting credits trying to find personal emails for contacts where you already have a work email.

*Creating a conditional run for personal emails*

### **💼 Optimizing Your Workflow**

By using conditional runs, you can create highly optimized workflows that only run enrichments when necessary. This not only saves you credits but also ensures you're getting the most relevant data for each contact in your database.

### **‍🚀 Putting It All Together**

The combination of AI formulas and conditional runs in Clay provides a powerful toolkit for data enrichment and analysis. You can extract deep insights from your data, create custom enrichment flows, and optimize your credit usage – all within the same platform.

Remember, the key to mastering these features is experimentation. Don't be afraid to try different formulas, adjust your conditions, and see what works best for your specific use case. With practice, you'll be able to create sophisticated data workflows that give you exactly the information you need, when you need it.

# **🧹 Elevating Your Data Quality with Clay's Cleaning Tools**

*Note: this lesson also appears in Clay 101, Automated Inbound, and CRM Enrichment, so feel free to skim or skip if you've already seen it somewhere else*‍

Now that you’ve gathered a wealth of company and contact data, it’s time to clean it all up.

Getting data is just the first part of the journey. But if you’ve worked with data in the past, then you know that “garbage in leads to garbage out”. Luckily, with some clever native integrations we’ve built into Clay \- you can turn “garbage” data into “golden” data.

Let's explore how these tools can transform your workflow.‍

### **🛠️ Our Data Cleaning Arsenal‍**

Nestled within our enrichment panel, under the "Tools" section, you'll find a treasure trove of functions designed to manipulate and clean your data. These tools go beyond what AI formulas alone can offer, providing specialized solutions for common data challenges.

*View all your cleaning data functions in the tools modal*

### **🏷️ Normalizing Company Names: A Game-Changer**

One of our most popular cleaning tools addresses a common pain point: inconsistent company names. How often have you encountered company names cluttered with legal suffixes or unnecessary prefixes? Our normalize company names function tackles this issue head-on.

For instance, "Panamax Inc." becomes simply "Panamax," and "Cora, a company of blank" is streamlined to "Cora." This clean-up not only makes your data more uniform but also prepares it for seamless use in email copy or other communications.

*Utilizing the “Normalize company names” function to clean up company data*

### **📞 Beyond Company Names: Versatile Normalization**

Our normalization tools extend far beyond company names:

1. Text Whitespace: Ensure consistent spacing across all your text data.  
2. Phone Numbers: Standardize formats, removing or adding parentheses as needed.  
3. Locations: Create uniformity in how addresses and locations are represented.

These are just a few examples – we encourage you to explore the full range of normalization options available in Clay.‍

### **💡 The Power of Native Clay Actions**

One of the best parts about our data cleaning tools? They're completely credit-free. Since these functions operate by parsing existing data and executing code, rather than reaching out to external data providers, we can offer them to you without any additional charge.‍

### **🚀 Putting It Into Practice**

Let's walk through a quick example of how to use our normalize company names function:

1. Navigate to the enrichment panel and locate the "Tools" section.  
2. Scroll past the AI options to find our pre-built functions.  
3. Select "Normalize Company Names."  
4. Choose the appropriate input column (in this case, the company name from your companies table).  
5. Optionally, you can normalize the case and add additional fields as needed.  
6. Run the action across your rows.

The result? Clean, consistent company names ready for your next campaign or analysis.‍

### **🌟 Unlocking the Potential of Clean Data**

By leveraging Clay's data cleaning and normalization tools, you're setting yourself up for success. Clean data leads to more accurate analyses, more effective outreach, and ultimately, better business outcomes.

Remember, while we've highlighted some key features here, there's always more to explore. We encourage you to dive into our various normalization options and discover how they can enhance your specific workflows.

Data cleaning might not be the most glamorous part of data management, but with Clay's tools, it can be surprisingly straightforward – and even enjoyable. Happy data cleaning\!

# **🤖 Unleashing the Power of Claygent: Clay's Game-Changing AI Feature**

*Note: this lesson also appears in Clay 101, Limitless Research, and CRM Enrichment, so feel free to skim or skip if you've already seen it somewhere else*‍

Now that you're a prompting expert, it's time to dive into Clay's most powerful AI integration \- Claygent. At it's core, Claygent is an AI based web scraper perfectly designed for retrieving unstructured data in non-repeatable locations (think staff/people pages on various company websites as an example). ‍

### **🌐 Understanding Claygent: Your All-Knowing Digital Assistant**

Imagine having a tireless, incredibly knowledgeable assistant at your fingertips, ready to scour the web for any information you need. That's Claygent in a nutshell. It's designed to access and retrieve virtually any publicly available data point on the internet, with the exception of information hidden behind paywalls or password-protected areas.

What makes Claygent truly unique is its ability to harness both the vast expanse of web data and the analytical power of AI. However, it's important to remember that while Claygent has access to an enormous amount of information, its effectiveness relies heavily on the context and instructions you provide. Mastering the art of prompting is key to unlocking Claygent's full potential.

# **🔍 11 AI Prompts to Automate Prospect Research With Claygent**

Using AI for account level research can drastically reduce the time and effort spent on identifying key company information. Whether you're a salesperson, a marketer, or a founder, these AI prompts will prove beneficial in improving your understanding of your prospects and enhancing your outbound messaging.

This guide is your step-by-step roadmap to automate your prospecting research on both an account and personal level using the Use AI (ChatGPT) integration. Having spent considerable time compiling these prompts and refining them for best results, we are ecstatic to bring this valuable information to your fingertips. Note, that this is best for users who already have a list of Company Social Media pages, people’s social profiles, or a company domain.

For this video we’ve got a special guest feature from the one and only Eric Nowoslawski, the OG Clay creator\! ‍

### **🦸🏽♂️ Discovering Company Missions**

By leveraging the LinkedIn company description and OpenAI, we can generate a succinct mission statement for a given company. By using the prompts like "what is the mission of the company using this input," OpenAI can generate concise, conversational phrases that represent the company's focus. From Canva's focus on revolutionizing design to Salesforce's mission of connecting companies and customers for good, OpenAI can help you quickly identify the primary goals of various companies.

### **🫂 Identifying Ideal Customer Profiles**

The second step is to determine the typical customers that a company caters to. Using a company's description, we can prompt OpenAI to generate a list of job titles that may benefit most from the company's products or services. For example, Canva's ideal customers could include graphic designers, visual designers, and creative designers, whereas Notion could be targeting project managers.

### **💰 Inferring Pricing**

The next step involves using Google search to find a company's pricing page. This can provide us with a quick summary of the company's pricing strategy. From Canva's monthly price of $12.99 to Calendly's free service, OpenAI can provide a brief overview of each company's pricing structure.

### **🕵🏽♂️ Identifying Role Focus**

Next, we analyze the job titles from Profiles to determine the main focus of various roles within a company. For instance, a CTO's role could involve leading, organizing, and strategizing technical strategies. OpenAI has proven effective at predicting the primary responsibilities associated with different job titles.

### **📰 Summarizing News Articles**

By leveraging Predict leads feature and OpenAI, we can generate a succinct summary of the latest news articles about a company. For instance, OpenAI could note that Canva launched a new AI feature, or Calendly hired a new Chief Marketing Officer. This feature provides a quick way to keep up to date with a company's latest developments.

### **🥅 Inferring Company Goals from Job Listings**

Finally, OpenAI can also help infer the problems a company is trying to solve based on their open job positions. For example, if a company is hiring an Account Executive, OpenAI can suggest that the company is looking to improve international sales and customer relations.‍

### **🔢 B2B or B2C?**

Let's explore using AI to differentiate between B2B and B2C companies using Company descriptions. This method is highly accurate, with the AI correctly identifying B2B companies like Calendly, Loom, Bitwarden, and Salesforce, and B2C companies like Canva, Liquid Death, Red Bull, and Lime.

### **💬 Summarizing LinkedIn Posts**

AI can summarize the main ideas from LinkedIn posts, providing a quick way to gauge the content of the post. It can be used to efficiently reach out to individuals or companies about specific posts they have made, thereby personalizing your interaction.

### **💼 Cleaning Job Titles**

It's often the case that LinkedIn job titles are embellished or unnecessarily complex. This can lead to misunderstandings or could even make your communication seem automated. Utilizing AI to clean these titles will ensure your outreach seems personal and well-researched.

### **🏢 Identifying SaaS Companies**

SaaS companies can be tricky to identify, especially when they cater to specific industries. AI can help distinguish these companies based on their LinkedIn descriptions. It successfully identifies SaaS companies like Canva, Calendly, Clay, and others, while also accurately labeling non-SaaS companies such as Red Bull, Target, and Walmart.

### **🤝🏽 Reviewing Glassdoor Ratings**

Glassdoor reviews can offer crucial insights into a company's operations and culture. By automating a Google search to find Glassdoor reviews and utilizing AI to extract a company's overall rating, you'll have access to this valuable information in a structured format

*Selecting Claygent from the Enrichment Panel*

### **‍🚀 Getting Started with Claygent**

To begin your Claygent journey, navigate to the enrichment panel in your Clay workspace and look for the Tools section. Under AI, you'll find Claygent among other powerful options. We've made it easy to hit the ground running by providing a library of preset templates for common tasks. These templates are an excellent starting point, especially if you're new to working with AI agents.

For instance, if you need to locate a company's 10K report, you can simply input the company name from your table, and our pre-written prompt will guide Claygent in finding the relevant URL. This template approach not only saves time but also helps you understand how to structure effective prompts for various tasks.

*Using Claygent to find Company 10-Ks and Extract Information from them*

### **🧠 Choosing the Right Model: Neon, GPT-4, or Claude**

When using Claygent, you have the flexibility to choose from different AI models, each with its strengths:

1. Claygent Neon: Our flagship model, specially designed for agent tasks. While it may not have the same level of reasoning capabilities as some other models, it excels in answer formatting and data extraction. Neon allows you to format results into multiple columns or outputs, making it incredibly powerful for extracting various data points from a single Claygent run.  
2. GPT-4 and Claude Opus: These models offer enhanced reasoning capabilities. While they don't provide the same level of answer formatting as Neon, they can be useful for testing data accuracy or handling more complex analytical tasks.

Selecting the right model is more of an art than a science, and we encourage you to experiment to find the best fit for your specific needs.

### **💡 Practical Applications: From LinkedIn Profiles to Thought Leadership**

Let's explore some real-world applications of Claygent to illustrate its versatility:

1. LinkedIn Profile Enrichment: With just a few input variables, Claygent can locate an individual's LinkedIn profile and extract valuable information such as work experience, awards, and summary.  
2. Social Profile Analysis: Once you have the LinkedIn data, you can use AI (not necessarily Claygent for this step) to summarize the information and highlight the three most unique or interesting insights about the individual.  
3. Thought Leadership Research: Claygent truly shines when tasked with finding thought leadership content. You can instruct it to search for blogs, interviews, podcasts, and articles related to a specific person. Using the Neon model, you can extract multiple pieces of research into separate outputs, making it easy to organize and analyze the findings.  
4. Content Analysis: For each piece of research found, you can run another Claygent call to extract metadata and key excerpts. This might include classifying the content type (blog, podcast, interview, etc.), identifying the author, summarizing main points, and pulling relevant quotes or snippets.  
5. Personalized Outreach: All this rich, personalized data can then be used to craft highly targeted and engaging outreach messages, significantly improving your communication strategies.

*Using Claygent to find and extract thought leadership in Clay*

### **🔮 The Future of AI-Powered Research**

Claygent represents a significant leap forward in how we approach data gathering and analysis. By combining the vast resources of the web with the intelligence of AI, we're opening up new possibilities for personalization, research, and outreach.

We're thrilled to see how you will leverage Claygent in creative and exciting ways. Whether you're in sales, marketing, research, or any field that requires deep, personalized insights, Claygent is poised to become an indispensable tool in your arsenal.

As we continue to refine and expand Claygent's capabilities, we encourage you to explore, experiment, and push the boundaries of what's possible. The future of AI-powered research is here, and it's more accessible than ever before.

# **Mastering AI-Powered Copywriting in Clay 🚀**

*Note: this lesson also appears in Clay 101 so feel free to skim or skip if you've already seen it somewhere else*‍

At Clay, we're always looking for ways to enhance our outreach strategies, and AI-powered copywriting has become an invaluable tool in our arsenal. In this article, we'll dive into the best practices for leveraging AI in your copywriting efforts within the Clay platform.

### **The Power of AI Snippets 💡**

When it comes to AI copywriting, we've found that using what we call "AI snippets" is the most effective approach. Instead of generating entire paragraphs or lengthy content, we focus on crafting individual sentences or small chunks of text at a time. This method allows us to maintain tight control over the scope, boundaries, and parameters of our AI-generated content.

We've learned through experience that when we ask AI to generate multiple sentences or paragraphs, the instructions can become too broad, leaving room for error. Generative AI tends to struggle with these wider scopes, often producing content that veers off-topic or doesn't align with our intended message. By sticking to smaller snippets, we can harness the strengths of AI while avoiding its potential pitfalls.

### **Crafting the Perfect Subject Line ✉️**

Let's walk through an example of how we use AI snippets in Clay to create compelling email copy. We'll start with the subject line, as it's often the first thing our recipients see. Using our research table on individual contacts, which includes extracted thought leadership insights, we craft a single, impactful sentence.

We follow email best practices by keeping our subject lines under eight words, focusing on the second person, and referencing relevant research about the individual. To guide the AI, we provide a few examples of what we're looking for, often starting with phrases like "Your insights on..."

*Creating AI generated Subject lines from Thought Leadership*

### **Building the Email Body 📝**

Once we have our subject line, we move on to drafting the email body. The first line is crucial, as it should follow up on the insights mentioned in the subject line. We typically start with something like "Just read" or "Just listened to," referencing the type of research we're drawing from.

It's important to keep these sentences succinct while still including valuable insights. We provide examples to the AI to ensure we get the desired output. One critical step we never skip is feeding the AI the lines we've already crafted. This prevents repetition and ensures each new sentence adds unique value to our message.

*Crafting the Email First line after Subject line*

### **Adding Personal Touches 🎨**

To make our emails stand out, we often include creative elements like quotes from podcasts or blog posts. We might also add a personalized postscript (PS) that references something specific about the recipient, such as their alma mater or a tradition from their university days.

### **The Result: Personalized, Engaging Copy 🎯**

By following these practices, we end up with highly personalized and engaging email copy. This approach allows us to create unique, one-on-one copy for each prospect while maintaining efficiency through AI assistance.

*Sample final email output to Kareem, CEO and Co-Founder at Clay*

### **Putting It All Together 🔄**

Once we've crafted our personalized copy, we're ready to sync it back to our sequencing tools. This allows us to put our AI-powered messages into action and start booking meetings with our prospects.

By mastering these AI copywriting techniques in Clay, we've significantly improved our outreach efforts. We're able to create highly personalized, engaging content at scale, while maintaining the human touch that's so crucial in building meaningful business relationships.

# **🧠 Unlocking the Power of AI in Clay: A Treasure Trove of Prompts**

At Clay, we're always striving to empower our users with the most effective tools for data manipulation and analysis. Today, we're excited to unveil a game-changing resource: our comprehensive collection of AI prompts designed to supercharge your Clay experience. These carefully crafted prompts are the result of extensive testing and real-world application, aimed at accelerating your AI-driven workflows within our platform.

### **🗂️ Three Pillars of AI Prompting**

Our prompts are thoughtfully organized into three main categories, each addressing a crucial aspect of data processing and content creation:

1. Information Summarization: Distilling complex data into digestible insights  
2. Information Extraction: Categorizing and pulling specific data points from larger datasets  
3. Copywriting and Content Generation: Creating compelling, tailored content at scale

Let's dive deeper into each category and explore the myriad ways these prompts can transform your workflow.

*The three main categories of basic AI prompting in Clay*

### **📊 Mastering Information Summarization**

In today's data-rich environment, the ability to quickly synthesize information is invaluable. Our summarization prompts are designed to tackle a wide array of use cases. Imagine connecting your Gong or Fathom call recordings to Clay, then using AI to distill key points from lengthy transcripts. Or consider enriching social media data to surface unique insights about your prospects or customers.

These prompts excel at condensing recent news articles, job listings, and company information into actionable intelligence for your sales team. They can even summarize third-party content like blog posts, interviews, or panel discussions, ensuring you stay on top of industry trends without drowning in information.

*Sample prompts for Summarization*

### **🔍 The Art of Information Extraction**

Moving beyond summarization, our extraction prompts are designed to pull specific, high-value data points from your datasets. Whether you need to determine which job titles a company sells to, extract coordinates from addresses, or identify a company's customer base from scraped data, we've got you covered.

These prompts can uncover company missions, target markets, pricing structures, and even analyze job titles to understand role focuses. They can categorize companies as B2B or B2C, identify SaaS providers, assess Glassdoor reviews, and pinpoint the problems a company solves. From normalizing location data to determining time zones and seniority levels, these prompts offer a powerful toolkit for data refinement.

*Sample prompts for Extracting Information*

### **✍️ Elevating Your Copywriting Game**

Last but certainly not least, our creative copywriting prompts are designed to add a spark of creativity to your content generation efforts. From the whimsical task of writing bios for animal shelter cats to the practical challenge of crafting compelling subject lines and outreach messages, these prompts cover a broad spectrum of copywriting needs.

Need to find the perfect meme to illustrate a customer's pain point? We've got a prompt for that. Looking to generate personalized plant recommendations? We've thought of that too. Our copywriting prompts are designed to inject creativity and personalization into your communications at scale.

*Sample prompts for AI copywriting*

### **🚀 Your Launchpad for AI-Driven Success**

While we've provided a rich array of prompts to get you started, we encourage you to view these as a foundation rather than a limitation. Feel free to use them as-is, or better yet, adapt and modify them to suit your specific needs. The beauty of these prompts lies in their flexibility \- they're designed to be tweaked and tailored to your unique use cases.

For instance, if you're looking to summarize a specific type of content that isn't covered in our existing prompts, use one of our summarization prompts as a starting point. Modify it to fit your needs, and you'll be off to the races in no time.

At Clay, we believe in the power of AI to transform business processes, and these prompts are our way of putting that power directly into your hands. We're excited to see how you'll use these prompts to drive innovation, streamline your workflows, and uncover new insights within your data.

Remember, the world of AI is ever-evolving, and so too will our collection of prompts. We encourage you to experiment, iterate, and share your successes with the Clay community. Together, we're pushing the boundaries of what's possible with AI-driven data analysis and content creation.

Happy prompting, and here's to your AI-powered success\!

# **📧 Pushing Data from Clay to Your Email Sequencing Tool: A Seamless Integration**

*Note: this lesson also appears in Clay 101 so feel free to skim or skip if you've already seen it somewhere else*‍

In the world of modern sales and marketing, the ability to seamlessly push data from your enrichment platform to your email sequencing tool is crucial. At Clay, we've made this process intuitive and flexible, allowing you to integrate with a wide range of popular tools such as Instantly, SmartLead, Outreach.io, SalesLoft, and LemList. In this guide, we'll walk you through the process using Instantly as an example, but remember, the logic is easily replicable across other platforms.

### **🔄 From HubSpot to Clay: Preparing Your Data**

Let's set the stage. You've pulled a list of contacts from HubSpot into Clay, updated their email addresses to ensure accuracy, and pushed this information back to HubSpot. Now, you're ready to reach out to these contacts with some carefully crafted copy. While we always advocate for high-quality, personalized messaging, for demonstration purposes, we'll use a simplified approach that mirrors a common strategy: using AI-generated snippets to create email bodies and custom variables for subject lines.

### **🎯 Creating Your Campaign in Instantly**

The first step in our process is to set up a new campaign in your sequencing tool. In Instantly, this is as simple as navigating to the Campaigns section and clicking "Add New." We'll name our campaign "Demo Campaign" for this example. At this point, you'll notice that your newly created campaign is empty, eagerly awaiting the leads you're about to add.

*Creating your campaign in Instantly*

### **🔗 Bridging Clay and Instantly: The Enrichment Step**

Now comes the exciting part \- connecting Clay to Instantly. Back in your Clay workspace, you'll want to add an Instantly enrichment to your table. This enrichment will be configured to add leads to your newly created campaign.

In the enrichment settings, you'll select your "Demo Campaign" and set up the necessary fields. At a minimum, you'll want to include the lead's email address. For a more comprehensive approach, consider adding first name, last name, and any other relevant details.

The real magic happens when you add custom variables. In our example, we're including "subject line" and "email body" as custom fields. These will be populated from the corresponding columns in your Clay table, allowing for personalized content for each lead.

⚠️ Troubleshooting Tip: If you encounter a "missing input" error, double-check that you're using the correct column names from your Clay table. In our case, we needed to use the "validated work email" column instead of a generic "email" column.

*Connecting Records in Clay to Instantly*

### **🚀 Launching Your Campaign**

Once you've set up your enrichment correctly and run it on your Clay table, it's time to head back to Instantly. Refresh your campaign page, and voila\! You should see your leads populated with their personalized subject lines and email bodies, ready for outreach.

*Double-checking your campaign in Instantly*

### **🔍 Fine-tuning Your Sequence**

For those looking to take their personalization to the next level, consider adding more custom variables to your API call. You could include separate fields for each step of your sequence \- "email body one," "subject line one," "email body two," "subject line two," and so on. This approach allows you to craft a highly personalized, multi-step sequence for each lead.

By mastering this integration between Clay and your email sequencing tool, you're setting yourself up for more efficient, personalized, and effective outreach campaigns. Remember, the key to success lies not just in the technology, but in the quality and relevance of your messaging. Use these tools to enhance your human touch, not replace it.

Happy sequencing\!

# **🔗 Seamlessly Integrating AI-Generated Outreach with Your Sequencing Tool**

At Clay, we understand that creating personalized, AI-powered outreach is only half the battle. The real challenge lies in effectively using this tailored content within your preferred sequencing tool. In this article, we'll walk you through the process of integrating your AI-generated outreach from Clay into your sequencing platform of choice, whether it's Smartlead, Instantly, Outreach, SalesLoft, or any other tool.

### **📊 Preparing Your Clay Table**

Before diving into the sequencing tool integration, it's crucial to have all your final copy ready and generated within your Clay table. We typically use a deep personalization table that includes custom-built subject lines and final emails for each prospect. These elements are generated using AI, as detailed in our AI copywriting guide.

In our Clay table, you'll find columns for custom subject lines and final emails, complete with personalized quotes and PS lines for each individual. This preparation ensures that when a contact is actioned in your sequencer, it uses the custom content we've crafted.

### **🚀 Setting Up Your Sequencing Campaign**

Once your Clay table is prepared, it's time to set up your campaign in your sequencing tool. For this example, we'll use Smartlead, but the principles apply across different platforms. Start by creating a new campaign, but don't import leads just yet – we'll be sending these from Clay.

In your campaign setup, it's crucial to include the names of the variables you'll use for the subject line and email body. We typically use "subject\_line" and "email\_body" as our variable names. Remember to wrap these variables in double curly brackets (e.g., {{subject\_line}}) to indicate to your sequencing tool that these are custom variables to be swapped with your email copy.

*Setting up your campaign in Smartlead*

### **⚙️ Configuring Campaign Settings**

After setting up your campaign structure, it's time to configure the settings. Choose your sender accounts, ensuring you're rotating your inboxes according to cold email best practices. Set your campaign rules, including start dates, time periods between sequences, and active days. You can also fine-tune settings like when to stop sending messages, email delivery optimization, and integration with other tools like HubSpot.

*Inserting the right variables in SmartLead for Personalization*

### **🌉 Bridging Clay and Your Sequencing Tool**

With your sequencing campaign ready, it's time to connect it with Clay. In Clay, add the enrichment for your sequencing tool (in this case, Smartlead). Select your campaign and input all the necessary variables. Essential fields include the email address of each prospect, but it's good practice to include names and company names for clean referencing and campaign performance analysis.

The most critical step is adding custom fields. These should match exactly with the variables you set in your sequencing tool. For instance, add "subject\_line" and "email\_body" as custom fields, then map these to the corresponding columns in your Clay table containing your AI-generated content.

*Inserting your custom AI generated copy in custom variables to SmartLead*

### **🚀 Launching Your Campaign**

After saving and running your rows in Clay, the leads will be added to your sequencing campaign. It's essential to double-check that everything is syncing correctly. Go back to your sequencing tool, edit your campaign setup, and review the final output. Ensure that your copy is displaying exactly as intended, with all variables correctly populated.

By following these steps, you'll successfully bridge the gap between Clay's AI-powered content generation and your sequencing tool's outreach capabilities. This integration allows you to leverage highly personalized, one-to-one content at scale, significantly enhancing the effectiveness of your outreach campaigns.

Remember, while we've used Smartlead in this example, the core principles apply across various sequencing tools. The key is to ensure proper variable mapping between Clay and your chosen platform, allowing for seamless transmission of your personalized content.

With this integration in place, you're now ready to launch your AI-enhanced, personalized outreach campaigns. By combining the power of Clay's AI-generated content with the efficiency of your sequencing tool, you're set to elevate your outreach game and connect with prospects more effectively than ever before. Happy sequencing\! 🎉

*Viewing your final personalized copy in SmartLead*