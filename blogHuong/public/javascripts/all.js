// REGISTER
$("#form-signUp").submit(function(e) {
  // console.log("helloooooo");
  e.preventDefault();
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/users/register`;
  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    // data: { username: usernameaa },
    data: $("#form-signUp").serialize(),
    dataType: "json",
    success: function(result) {
      // console.log("RESULT :", result);
      if (result.result == "success") {
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["success"](`${result.message}`, "Notification");
      } else if (result.result == "failed") {
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["error"](`${result.message}`, "Notification");
      }
    }
  });
});

//LOGIN
$("#form-signIn").submit(function(e) {
  e.preventDefault(); // vi k su dung form de submit
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/users/login`;
  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    // data: { username: usernameaa },
    data: $("#form-signIn").serialize(),
    dataType: "json",
    success: function(result) {
      if (result.result == "success") {
        window.location.href = `${location.protocol}//${document.domain}:${
          location.port
        }`;
      } else if (result.result == "failed") {
        // console.log(result);
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["error"](`${result.message}`, "Notification");
      }
    }
  });
});


// ________________________________ HOME ______________________________________
// LOG OUT (HOME)
$("#home-logout-btn").click(e => {
  // console.log("click dc roi ne");
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/users/logout`;
  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    dataType: "json",
    success: function(result) {
      // console.log("LOGOUT SUCCESSSSSSS");
      $("#nav-dropdown").html(`
												<ul id="logged-out-menu" class="nav navbar-nav navbar-right">
					
					<li>
						<a href="/users">
							<i class="fas fa-sign-in visible-xs-inline"></i>
							<span>Login</span>
						</a>
					</li>
				</ul>
								<ul class="nav navbar-nav navbar-right">
					<li data-original-title="" title="">
						<form id="search-form" class="navbar-form navbar-right hidden-xs" role="search" method="GET" action="">
							<button id="search-button" type="button" class="btn btn-link"><i class="fas fa-search fa-fw" title="Search"></i></button>
							<div class="hidden" id="search-fields">
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Search" name="query" value="">
									<a href="#"><i class="fas fa-gears fa-fw advanced-search-link"></i></a>
								</div>
								<button type="submit" class="btn btn-default hide">Search</button>
							</div>
						</form>
					</li>
					<li class="visible-xs" id="search-menu">
						<a href="/search">
							<i class="fas fa-search fa-fw"></i> Search
						</a>
					</li>
				</ul>

				<ul class="nav navbar-nav navbar-right hidden-xs">
					<li>
						<a href="#" id="reconnect" class="hide" title="" data-original-title="Connection to Nodejs.vn has been lost, attempting to reconnect...">
							<i class="fas fa-check"></i>
						</a>
					</li>
				</ul>

				<ul class="nav navbar-nav navbar-right pagination-block visible-lg visible-md">
					<li class="dropdown">
						<i class="fas fa-angle-double-up pointer fa-fw pagetop"></i>
						<i class="fas fa-angle-up pointer fa-fw pageup"></i>

						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<span class="pagination-text"></span>
						</a>

						<i class="fas fa-angle-down pointer fa-fw pagedown"></i>
						<i class="fas fa-angle-double-down pointer fa-fw pagebottom"></i>

						<div class="progress-container">
							<div class="progress-bar"></div>
						</div>

						<ul class="dropdown-menu" role="menu">
  							<input type="text" class="form-control" id="indexInput" placeholder="Enter index">
  						</ul>
					</li>
				</ul>

				<ul id="main-nav" class="nav navbar-nav">
															<li class="">
						<a href="/categories" title="" data-original-title="Categories">
														<i class="fas fa-fw fa-list"></i>

														<span class="visible-xs-inline">Categories</span>
						</a>
					</li>
														<li class="">
						<a href="/recent" title="" data-original-title="Recent">
														<i class="fas fa-fw fa-clock"></i>

														<span class="visible-xs-inline">Recent</span>
						</a>
					</li>
									
														<li class="">
						<a href="/tags" title="" data-original-title="Tags">
														<i class="fas fa-fw fa-tags"></i>

														<span class="visible-xs-inline">Tags</span>
						</a>
					</li>
														<li class="">
						<a href="/popular" title="" data-original-title="Popular">
														<i class="fas fa-fw fa-fire"></i>

														<span class="visible-xs-inline">Popular</span>
						</a>
					</li>
														<li class="">
						<a href="/users" title="" data-original-title="Users">
														<i class="fas fa-fw fa-user"></i>

														<span class="visible-xs-inline">Users</span>
						</a>
					</li>
														<li class="">
						<a href="/groups" title="" data-original-title="Groups">
														<i class="fas fa-fw fa-group"></i>

														<span class="visible-xs-inline">Groups</span>
						</a>
					</li>
									
														<li class="">
						<a href="/search" title="" data-original-title="Search">
														<i class="fas fa-fw fa-search"></i>

														<span class="visible-xs-inline">Search</span>
						</a>
					</li>
				</ul>
      `);
      $(".pull-right").html(`
        <a href="/users"><button id="new_topic" class="btn btn-primary">Login to post</button></a>
      `);
    }
  });
});

// CREATE POST (HOME)
$("#home-post-submit").click(function(e) {
  e.preventDefault(); // loai bo trang thai mac dinh (submit k reload nua)
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/home/newpost`;
  const newtitle = $("#home-postContent").val();
  const newtags = $(".category-list").val();
  const newcontent = $("#needToPreview").val();
  const newauthor = $(".home-post-author")
    .text()
    .trim();
  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    data: {
      title: newtitle,
      tags: newtags,
      content: newcontent,
      author: newauthor
    },
    // data: $(".form-horizontal").serialize(),
    dataType: "json",
    success: function(result) {
      // console.log("create thanh cong");
      if (result.result == "success") {
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["success"](`${result.message}`, "Notification");
      } else if (result.result == "failed") {
        // console.log(`khong create duoc`);
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["error"](`${result.message}`, "Notification");
      }
    }
  });
});

// SHOW EDITOR (HOME)
$("#new_topic").click(e => {
  $("#post-form-newpost").toggleClass("dnonee");
});

//DISCARD EDITOR (HOME)
$("#home-post-discard-editor").click(e => {
  $("#post-form-newpost").toggleClass("dnonee");
});

//BIGGER EDITOR (HOME)

//PREVIEW EDITOR (HOME)

// __________________________________ ADMIN _______________________________________
//LOGOUT (ADMIN)
$("#admin-logout-btn").click(function(e) {
  // e.preventDefault(); // vi k su dung form de submit
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/users/logout`;
  // const usernameaa = $("#admin-username-hidden")
  // 	.text()
  // 	.trim();
  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    // data: { username: usernameaa },
    // data: $("#form-signIn").serialize(),
    dataType: "json",
    success: function(result) {
      // console.log("LOGOUT SUCCESSSSSSS");
      window.location.href = `${location.protocol}//${document.domain}:${
        location.port
      }`;
    }
  });
});

// EDIT PROFILE (ADMIN)
$("#admin-form-updateProfile").submit(function(e) {
  // console.log("submit vao duoc roi neeeeeeeeee");
  e.preventDefault(); // loai bo trang thai mac dinh (submit k reload nua)
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/admin/editprofile`;
  const updatedAvatar = $("#inputFullname").val();
  const updatedPassword = $("#inputWebsite").val();
  const updatedRepassword = $("#inputLocation").val();
  const usernameFrForm = $(".admin-username-hidden")
    .text()
    .trim();
  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    data: {
      username: usernameFrForm,
      avatar: updatedAvatar,
      password: updatedPassword,
      repassword: updatedRepassword
    },
    // data: $(".form-horizontal").serialize(),
    dataType: "json",
    success: function(result) {
      console.log("update ok roi ne");
      if (result.result == "success") {
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["success"](`${result.message}`, "Notification");

        if (updatedAvatar) {
          $(".admin-user-avatar-onnav").html(
            `<img src="${updatedAvatar}" alt="User Avatar" id="admin-user-avatar">`
          );
          $(".admin-user-avatarbig").html(
            `
            <img src=\"${updatedAvatar}\" alt=\"huongnguyen2152360@gmail.com\" id=\"admin-userAvatar\">
            <div class=\"admin-userStatus\"><i component=\"user/status\" class=\"fas fa-circle status online statusStyle\" title=\"Online\"></i></div>  
            `
          );
        }
      } else if (result.result == "failed") {
        console.log(`FAILED!`);
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["error"](`${result.message}`, "Notification");
      }
    }
  });
});

// SHOW EDITOR WITH POST'S TEXT (ADMIN)
$(".admin-edit-btn").click(function(e) {
  // console.log('admin-edit-btn');
  $("#post-form-newpost1").toggleClass("dnonee");
  
  const getContentID = $($(this).parent())
    .parent()
    .find(".admin-post-title").data(`id`)
  $("#admin-postContent").val(
    `${$($(this).parent())
      .parent()
      .find(".admin-post-title")
      .text()
      .trim()}`
  );
  $("#admin-postContent").data("id",getContentID);
  $(".category-list").val(
    `${$($(this).parent())
      .parent()
      .find(".admin-post-tags")
      .text()
      .trim()}`
  );

  $('textarea').froalaEditor('html.set', `${$($(this).parent())
        .parent()
        .find(".admin-post-content")
        .text()
        .trim()}`);

});

// CLICK SUBMIT BTN TO EDIT POST (ADMIN)
$("#admin-post-submit").click(function(e) {
  e.preventDefault(); // loai bo trang thai mac dinh (submit k reload nua)
  const url = `${location.protocol}//${document.domain}:${
    location.port
  }/admin/editpost`;
  const newId = $("#admin-postContent").data(`id`);
  const newtitle = $("#admin-postContent").val();
  const newtags = $(".category-list").val();
  const newcontent = $("#needToPreview").val();
  const newauthor = $(".admin-post-author")
    .text()
    .trim();

  $.ajax({
    url: url,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
    type: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    },
    async: true,
    data: {
      id: newId,
      title: newtitle,
      tags: newtags,
      content: newcontent,
      author: newauthor
    },
    // data: $(".form-horizontal").serialize(),
    dataType: "json",
    success: function(result) {
      // console.log("create thanh cong");
      if (result.result == "success") {
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["success"](`${result.message}`, "Notification");
      } else if (result.result == "failed") {
        // console.log(`khong create duoc`);
        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showDuration: 300,
          hideDuration: 1000,
          timeOut: 2000,
          extendedTimeOut: 1000,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut"
        };
        toastr["error"](`${result.message}`, "Notification");
      }
    }
  });
});

// CLICK DELETE BTN TO DELETE POST (ADMIN)
$('.admin-delete-btn').click((e) => {
  const idToDelete = $($(e.target).parent()).parent().find('.admin-post-title').data(`id`); 
  $("#sosureBtn").click(e => {
    e.preventDefault();
    const url = `${location.protocol}//${document.domain}:${
      location.port
    }/admin/deletepost`;
    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      type: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      async: true,
      data: {
        id: idToDelete
      },
      // data: $(".form-horizontal").serialize(),
      dataType: "json",
      success: function(result) {
        // console.log("create thanh cong");
        if (result.result == "success") {
          toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 2000,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
          };
          toastr["success"](`${result.message}`, "Notification");
          window.location.href = `${location.protocol}//${document.domain}:${
          location.port
        }/admin`;

        } else if (result.result == "failed") {
          // console.log(`khong create duoc`);
          toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 2000,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
          };
          toastr["error"](`${result.message}`, "Notification");
        }
      }
    });
  });
})


