using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class CloudinarySettings 
    {
       public string CloudName { get; set; }
       public string ApiKey { get; set; }
       public string ApiSecret { get; set; }
    }
}