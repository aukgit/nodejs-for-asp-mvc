using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Ajax.Utilities;

namespace SampleMvc.Models {
    public class Person {
        public Person(string firstName, string lastName) {
            this.FirstName = firstName;
            this.LastName = lastName;
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }

       
    }

    public static class PersonExtension {
        public static string ExampleMethod(this Person p) {
            return p.FirstName + " " + p.LastName;
        }
    }
}