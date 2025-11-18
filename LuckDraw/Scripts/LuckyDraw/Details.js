
$(document).ready(function () {
   
    // Load Candidates List
    $("#candidateListBtn").click(function () {
        loadCandidates();
    });

    function loadCandidates() {
        $("#candidateBody").html('<tr><td colspan="3">Loading...</td></tr>');
        return $.ajax({
            url: candidateUrls.get,
            type: "GET",
            data: { id: luckyDrawId },
            cache: false,
            success: function (response) {
                $("#candidateBody").empty();
                if (response && response.length > 0) {
                    $.each(response, function (index, c) {
                        $("#candidateBody").append(`
                                    <tr data-id="${c.Id}">
                                        <td><input type="text" class="form-control fullName" value="${c.FullName}" readonly></td>
                                        <td><input type="text" class="form-control dept" value="${c.Department}" readonly></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary edit-btn">✏️</button>
                                            <button class="btn btn-sm btn-outline-danger delete-btn">🗑️</button>
                                        </td>
                                    </tr>
                                `);
                    });
                } else {
                    $("#candidateBody").append('<tr><td colspan="3">No candidates available.</td></tr>');
                }
            },
            error: function () {
                $("#candidateBody").html('<tr><td colspan="3">Error loading candidates.</td></tr>');
            }
        });
    }

    // Add new candidate
    $("#addCandidateBtn").click(function () {
        var fullName = $("#newFullName").val().trim();
        var dept = $("#newDepartment").val().trim();

        if (!fullName || !dept) {
            alert("Please enter both Full Name and Department.");
            return;
        }

        $.post(candidateUrls.create,
            { luckyDrawId: luckyDrawId, fullName: fullName, department: dept },
            function (res) {
                if (res.success) {
                    $("#newFullName, #newDepartment").val("");
                    loadCandidates().done(function () {
                        refreshCandidateCards();
                    });
                } else {
                    alert("Add failed: " + res.message);
                }
            }
        );
    });

    // Edit candidate
    $(document).on("click", ".edit-btn", function () {
        var row = $(this).closest("tr");
        var isEditing = row.find(".fullName").is("[readonly]") === false;

        if (!isEditing) {
            // Chuyển sang chế độ chỉnh sửa
            row.find(".fullName, .dept").prop("readonly", false).addClass("border-warning");
            $(this).text("💾");
        } else {
            // Lưu lại
            var id = row.data("id");
            var fullName = row.find(".fullName").val();
            var dept = row.find(".dept").val();

            $.post(candidateUrls.edit, 
                { id: id, fullName: fullName, department: dept },
                function (res) {
                    if (res.success) {
                        row.find(".fullName, .dept").prop("readonly", true).removeClass("border-warning");
                        row.find(".edit-btn").text("✏️");
                        loadCandidates().done(function () {
                            refreshCandidateCards();
                        });
                    } else {
                        alert("Update failed: " + res.message);
                    }
                }
            );
        }
    });

    // Delete candidate
    $(document).on("click", ".delete-btn", function () {
        if (!confirm("Are you sure you want to delete this candidate?")) return;

        var id = $(this).closest("tr").data("id");
        $.post(candidateUrls.delete, { id: id }, function (res) {
            if (res.success) {
                loadCandidates().done(function () {
                    refreshCandidateCards();
                });
            } else {
                alert("Delete failed: " + res.message);
            }
        });
    });

    //Refresh Candidate Cards immediately after any CRUD operation
    function refreshCandidateCards() {
        var grid = $(".candidate-grid");
        if (grid.length === 0) {
            console.warn("Candidate grid not found.");
            return;
        }

        $.ajax({
            url: candidateUrls.get,
            type: "GET",
            data: { id: luckyDrawId },
            cache: false,
            success: function (response) {
                grid.empty();

                if (response && response.length > 0) {
                    $.each(response, function (index, c) {
                        grid.append(`
                        <div class="candidate-card">
                            <div class="candidate-name">${c.FullName}</div>
                            <div class="candidate-dept">${c.Department}</div>
                        </div>
                    `);
                    });
                } else {
                    grid.html("<p>No candidates available.</p>");
                }
            },
            error: function () {
                console.error("❌ Failed to refresh candidate cards.");
            }
        });
    }


    //Load Prizes List
    $("#prizeListBtn").click(function () {
        loadPrizes();
    });
    function loadPrizes() {
        $("#prizeBody").html('<tr><td colspan="3">Loading...</td></tr>');
        $.ajax({
            url: prizeUrls.get,
            type: "GET",
            data: { id: luckyDrawId },
            success: function (response) {
                $("#prizeBody").empty();
                if (response && response.length > 0) {
                    $.each(response, function (index, p) {
                        $("#prizeBody").append(`
                            <tr data-id="${p.Id}">
                                <td><input type="text" class="form-control prizeName" value="${p.NamePrize}" readonly></td>
                                <td><input type="number" class="form-control prizeQty" value="${p.Quantity}" readonly></td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary prize-edit-btn">✏️</button>
                                    <button class="btn btn-sm btn-outline-danger prize-delete-btn">🗑️</button>
                                </td>
                            </tr>
                        `);
                    });
                } else {
                    $("#prizeBody").append('<tr><td colspan="3">No prizes available.</td></tr>');
                }
            },
            error: function () {
                $("#prizeBody").html('<tr><td colspan="3">Error loading prizes.</td></tr>');
            }
        });
    }

    //Add new prize
    $("#addPrizeBtn").click(function () {
        var namePrize = $("#newPrizeName").val().trim();
        var qty = $("#newPrizeQty").val().trim();

        if (!namePrize || !qty) {
            alert("Please enter both prize name and quantity.");
            return;
        }

        $.post(prizeUrls.create,
            { luckyDrawId: luckyDrawId, namePrize: namePrize, quantity: qty },
            function (res) {
                if (res.success) {
                    $("#newPrizeName, #newPrizeQty").val("");
                    loadPrizes();
                } else {
                    alert("Add failed: " + res.message);
                }
            }
        );
    });

    //Edit prize
    $(document).on("click", ".prize-edit-btn", function () {
        var row = $(this).closest("tr");
        var isEditing = row.find(".prizeName").is("[readonly]") === false;

        if (!isEditing) {
            // Bắt đầu chỉnh sửa
            row.find(".prizeName, .prizeQty").prop("readonly", false).addClass("border-warning");
            $(this).text("💾");
        } else {
            // Lưu chỉnh sửa
            var id = row.data("id");
            var namePrize = row.find(".prizeName").val();
            var qty = row.find(".prizeQty").val();

            $.post(prizeUrls.edit,
                { id: id, namePrize: namePrize, quantity: qty },
                function (res) {
                    if (res.success) {
                        row.find(".prizeName, .prizeQty").prop("readonly", true).removeClass("border-warning");
                        row.find(".prize-edit-btn").text("✏️");
                    } else {
                        alert("Update failed: " + res.message);
                    }
                }
            );
        }
    });

    //Delete prize
    $(document).on("click", ".prize-delete-btn", function () {
        if (!confirm("Are you sure you want to delete this prize?")) return;

        var id = $(this).closest("tr").data("id");
        $.post(prizeUrls.delete, { id: id }, function (res) {
            if (res.success) {
                loadPrizes();
            } else {
                alert("Delete failed: " + res.message);
            }
        });
    });
    refreshCandidateCards();

    // Load Prizes for Draw Modal
    $("#drawBtn").click(function () {
        loadDrawPrizes();
        $('#drawModal').modal('show');
    });

    function loadDrawPrizes() {
        $("#drawPrizeBody").html('<tr><td colspan="3">Loading...</td></tr>');
        $.ajax({
            url: prizeUrls.get,
            type: "GET",
            data: { id: luckyDrawId },
            cache: false,
            success: function (response) {
                $("#drawPrizeBody").empty();
                if (response && response.length > 0) {
                    $.each(response, function (index, p) {
                        $("#drawPrizeBody").append(`
                        <tr data-id="${p.Id}">
                            <td>${p.NamePrize}</td>
                            <td>${p.Quantity}</td>
                            <td>
                                <button class="btn btn-sm btn-primary draw-prize-btn">Draw</button>
                            </td>
                        </tr>
                    `);
                    });
                } else {
                    $("#drawPrizeBody").append('<tr><td colspan="3">No prizes available.</td></tr>');
                }
            },
            error: function () {
                $("#drawPrizeBody").html('<tr><td colspan="3">Error loading prizes.</td></tr>');
            }
        });
    }

    // Xử lý click Draw cho prize
    $(document).on("click", ".draw-prize-btn", function () {
        var prizeId = $(this).closest("tr").data("id");
        var prizeName = $(this).closest("tr").find("td:first").text();

        // Đóng modal draw
        $('#drawModal').modal('hide');

        // Bắt đầu animation draw
        startDrawAnimation(prizeName);
    });

    // Animation Draw: Highlight lần lượt các cards, dừng random
    function startDrawAnimation(prizeName) {
        // Lấy tất cả cards
        var cards = $(".candidate-card").toArray();
        if (cards.length === 0) {
            alert("No candidates available to draw.");
            return;
        }

        // Xóa highlight cũ
        $(".candidate-card").removeClass("highlight winner");

        var speed = 200; // Tốc độ ban đầu (ms)
        var minSpeed = 50; // Tốc độ nhanh nhất
        var rounds = 5; // Số vòng chạy (mỗi vòng qua hết cards)
        var totalSteps = cards.length * rounds + Math.floor(Math.random() * cards.length); // Tổng steps, dừng random

        var currentStep = 0;
        var interval = setInterval(function () {
            // Xóa highlight cũ
            $(".candidate-card").removeClass("highlight");

            // Highlight card hiện tại
            var currentIndex = currentStep % cards.length;
            $(cards[currentIndex]).addClass("highlight");

            // Giảm tốc độ dần (tăng độ chậm khi gần dừng)
            speed = Math.max(minSpeed, speed - 5); // Giảm tốc độ

            currentStep++;
            if (currentStep >= totalSteps) {
                clearInterval(interval);
                // Mark winner
                $(cards[currentIndex]).removeClass("highlight").addClass("winner");
                alert("Chúc mừng! Người trúng phần thưởng '" + prizeName + "' là: " + $(cards[currentIndex]).find(".candidate-name").text());
                // Có thể gọi API để lưu winner nếu cần
            }
        }, speed);
    }

});