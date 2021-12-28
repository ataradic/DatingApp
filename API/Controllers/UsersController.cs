
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using API.Entities;
using API.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using AutoMapper;
using API.DTOs;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _maaper;
        public UsersController(IUserRepository userRepository, IMapper maaper)
        {
            _maaper = maaper;
            _userRepository = userRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> getUsers()
        {
            return Ok(await _userRepository.GetMembersAsync());
            
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> getUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }
    }
}