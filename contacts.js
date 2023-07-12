const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        console.log('Get contacts list: ');
        console.table(JSON.parse(data));
    } catch (error) {
      console.log('Error :>> ', error.message);
    }
    }
    
    async function getContactById(contactId) {
      try {
          const data = await fs.readFile(contactsPath, "utf8");
          const contact = JSON.parse(data).find(({ id }) => id === contactId);
    
          console.log(`Get contact by id: ${contactId}`);
          console.table(contact);
      } catch (error) {
          console.log('Error :>> ', error.message);
      }
        
    }
    
    async function removeContact(contactId) {
      try {
          const data = await fs.readFile(contactsPath, "utf8");
          const contacts = JSON.parse(data);
  
          const isInList = contacts.find(({ id }) => id === contactId);
          if(!isInList){
              throw new Error(`Contact with ID ${contactId} is not in the list`);
          }
  
          const newContacts = contacts.filter(({ id }) => id !== contactId);
          await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
          const newData = await fs.readFile(contactsPath, "utf8");
  
          console.log(`Contact with ID ${contactId} has been removed`);
          console.table(JSON.parse(newData));
      } catch (error) {
          console.log('Error :>> ', error.message); 
      }
    }
    
    async function addContact(name, email, phone) {
       try {
          const newContact = { name, email, phone, id: uid(4) };
  
          const data = await fs.readFile(contactsPath, "utf8");
          const contacts = JSON.parse(data);
  
          contacts.push(newContact);
          await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
          const newData = await fs.readFile(contactsPath, "utf8");
  
          console.log(`Contact ${name} has been added to the list`);
          console.table(JSON.parse(newData));
       } catch (error) {
          console.log('Error :>> ', error.message); 
       }
    }
  
  module.exports = {
      listContacts,
      getContactById,
      removeContact,
      addContact,
  };