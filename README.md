# Setup Instructions
  - Start the Project using : npm run dev

# Features Implemented

  - WelcomePage
    - It is the landing page and also is the marketing page of the application

  - Register
      - The Default Admin can register themself

  - Login
      - Members and Admin can login to solve queries raised
  
  - Dashboard
     - Team Members and Admin can view all tickets , resolved , unresolved tickets
     - Admin and Team Members can search ticket by Ticket Address (by month , day , year or full address)
     - To view ticket: click on the "View Ticket" link to open the chosen ticket in the contactcenter page
   
  - ContactCenter
     - Chat-Section
         - All Chats will appear here
         - Select a chat to start messaging
      
     - Message-Section 
         - Messages corresponding to a chat will appear here
         - If a ticket is resolved then no further conversations are allowed in that chat
         - Only the member to whom the ticket is assigned can answer to that specific query
         - Type and send messages

      - Info Section
         - Info of the logged in user is shown here
         - If the user is the "defaut admin" then only he can view all team members under him
         - Admin can assign tickets to team members
         - Default Admin and Member Addmin can both set ticket status: Resolved or UnResolved
       
  - Team Members
     - Admin can view all the team members under them
     - Both Default admin and Member Admin can add , edit and delete team members

  - Analytics
     - Different metrics are provided for analysing performance
     - Here the Missed Chats line graph visually depicts the weekly missed chats
   
  - Chatbot Customozation
     - Header , Background color of chatbot can be customized
     - Placeholders of the Introduction Form , Welcome and prompt messages can be custiomized also
     - The Missed chat duration can also be set from here -> Defult is 1hr
   
  - Settings
     - Admin can edit their profile
     - Team Members can also edit their profile
   
  - NotFound
     - When user tries to access incorrect routes then they will be redirected to this page
     - Have buttons to navigate the user to specific pages

   - Chatbot
      - The landing page have a chatbot , where users can fill in the form and start asking queries
      - These quseries are to be answered by the Default admn and team members


# Demo Credentials
 - Default Admin
     - EmailID:  mahesh@gmail.com
     - Password: 123456
  
  - Team Member
      - Normal Member (Providing just 1 credential)
         - EmailID:  chanda@gmail.com
         - Password: 123456
       
      - Admin Member (Providing just 1 credential)
         - EmailID: garg@gmail.com
         - Password:  123456


# Live Demo Link
  - https://sapnil-ticket-system.netlify.app/


# An Imp Note (Implemented based on initial understanding -  correction is simple if needed.)
  - Whenever Default Admin add new members then the password of this member will be same as admin password
  - A team member can edit their profile and password also
    - If a team member edit password -> then only their password is updated
    - Afterwards if the Default Admin changes their password then again passwords of all the team members under this Default Admin will be updated to this new password
   

  - Whenver an admin member adds new team members then all these team members will get added under the Default Admin
    

# All Code is present in the Branch -> Functionality





  
