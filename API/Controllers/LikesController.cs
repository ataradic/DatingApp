

using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikeRepository _likeRepository;
        public LikesController(IUserRepository userRepository, ILikeRepository likeRepository)
        {
            _likeRepository = likeRepository;
            _userRepository = userRepository;
        }

        [HttpPost("{userName}")]
        public async Task<ActionResult> UserLiked(string userName)
        {

            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByNameAsync(userName);
            var sourceUser = await _likeRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == userName) return BadRequest("You cannot like yourself");

            var userLike = await _likeRepository.GetUserLike(sourceUserId, likedUser.Id);
            if (userLike != null) return BadRequest("You already like this member");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };
            sourceUser.LikedUsers.Add(userLike);
            if (await _userRepository.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to like member");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likeRepository.GetUserLikes(likesParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.ToatalCount, users.TotalPages);
            return Ok(users);

        }
    }
}