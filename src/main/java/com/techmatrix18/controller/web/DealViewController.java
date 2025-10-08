package com.techmatrix18.controller.web;

import com.techmatrix18.dto.DealDto;
import com.techmatrix18.model.Deal;
import com.techmatrix18.model.User;
import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.enums.ActivityType;
import com.techmatrix18.model.enums.DealStage;
import com.techmatrix18.service.ActivityService;
import com.techmatrix18.service.ClientService;
import com.techmatrix18.service.DealService;
import com.techmatrix18.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.logging.Logger;

/**
 * Deal controller with endpoints for deals pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class DealViewController {

    Logger log = Logger.getLogger(ClientViewController.class.getName());

    private final DealService dealService;
    private final ActivityService activityService;
    private final ClientService clientService;
    private final UserService userService;

    public DealViewController(DealService dealService,
                              ActivityService activityService,
                              ClientService clientService,
                              UserService userService) {
        this.dealService = dealService;
        this.activityService = activityService;
        this.clientService = clientService;
        this.userService = userService;
    }

    @GetMapping("/deals")
    public String getAllDeals(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size,
                                   Model model) {
        Page<Deal> dealsPage = dealService.getAllPaginated(page, size);

        model.addAttribute("dealsPage", dealsPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", dealsPage.getTotalPages());

        return "deals/index";
    }

    @GetMapping("/deals/add")
    public String addDeal(Model model) {
        model.addAttribute("dealDto", new DealDto()); // empty form
        model.addAttribute("stages", Arrays.asList(DealStage.values()));
        model.addAttribute("clients", clientService.getAll());
        return "deals/add";
    }

    @PostMapping("/deals/add")
    public String addDealPost(@Valid @ModelAttribute("dealDto") DealDto dealDto,
                                  BindingResult result,
                                  Model model,
                                  RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            model.addAttribute("clients", clientService.getAll());
            return "deals/add"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Deal deal = new Deal();
        deal.setClient(dealDto.getClient());
        deal.setName(dealDto.getName());
        deal.setAmount(new BigDecimal(dealDto.getAmount()));
        deal.setCurrency(dealDto.getCurrency());
        deal.setStage(dealDto.getStage());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        deal.setStartDate(LocalDateTime.parse(dealDto.getStartDate(), formatter));
        deal.setCloseDate(LocalDateTime.parse(dealDto.getCloseDate(), formatter));

        deal.setOwner(user);
        deal.setCreatedAt(LocalDateTime.now());
        deal.setUpdatedAt(LocalDateTime.now());

        // save Client in database
        dealService.saveDeal(deal);
        redirectAttributes.addFlashAttribute("successMessage", "Deal was successfully added!");

        return "redirect:/deals";
    }

    @GetMapping("/deals/edit/{id}")
    public String editDeal(@PathVariable Long id, Model model) {
        DealDto dealDto = dealService.getByIdDto(id);
        model.addAttribute("dealDto", dealDto);
        model.addAttribute("stages", Arrays.asList(DealStage.values()));
        model.addAttribute("clients", clientService.getAll());
        return "deals/edit";
    }

    @PostMapping("/deals/edit")
    public String editDealPost(@Valid @ModelAttribute("dealDto") DealDto dealDto,
                                   BindingResult result,
                                   Model model,
                                   RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            model.addAttribute("stages", Arrays.asList(DealStage.values()));
            model.addAttribute("clients", clientService.getAll());
            return "deals/edit"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Deal deal = dealService.getById(dealDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Deal not found with id " + dealDto.getId()));
        deal.setClient(dealDto.getClient());
        deal.setName(dealDto.getName());
        deal.setAmount(new BigDecimal(dealDto.getAmount()));
        deal.setCurrency(dealDto.getCurrency());
        deal.setStage(dealDto.getStage());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        deal.setStartDate(LocalDateTime.parse(dealDto.getStartDate(), formatter));
        deal.setStartDate(LocalDateTime.parse(dealDto.getCloseDate(), formatter));
        deal.setOwner(user);
        deal.setUpdatedAt(LocalDateTime.now());

        dealService.saveDeal(deal); // update entity

        redirectAttributes.addFlashAttribute("successMessage", "Deal was successfully updated!");
        return "redirect:/deals";
    }

    @GetMapping("/deals/view/{id}")
    public String viewDeal(@PathVariable Long id, Model model) {
        Deal deal = dealService.getById(id)
                .orElseThrow(() -> new EntityNotFoundException("Deal not found with id " + id));
        model.addAttribute("deal", deal);
        return "deals/view";
    }

    @GetMapping("/deals/delete/{id}")
    public String deleteDeal(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        dealService.deleteDeal(id);
        redirectAttributes.addFlashAttribute("successMessage", "Deal was successfully deleted!");
        return "redirect:/deals";
    }
}

