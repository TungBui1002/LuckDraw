
$(document).ready(function () {
   
    // Load Candidates List
    $("#candidateListBtn").click(function () {
        loadCandidates();
    });

    function loadCandidates() {
        $("#candidateBody").html('<tr><td colspan="3">Loading...</td></tr>');
        $.ajax({
            url: candidateUrls.get,
            type: "GET",
            data: { id: luckyDrawId },
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
                    loadCandidates();
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
                loadCandidates();
            } else {
                alert("Delete failed: " + res.message);
            }
        });
    });

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

});