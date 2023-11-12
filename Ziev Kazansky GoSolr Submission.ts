//Ziev Kazansky GoSolr Submission 2023

//initialise variables, allowing for inflation to be changed in future
const infl: number = 0.05;
const sml_mnth_23: number = 1399;
const sml_mnth_24: number = sml_mnth_23*(1+infl);
const med_mnth_23: number = 1740;
const med_mnth_24: number = med_mnth_23*(1+infl);
const lrg_mnth_23: number = 2900;
const lrg_mnth_24: number = lrg_mnth_23*(1+infl);
const xlrg_mnth_23: number = 4400;
const xlrg_mnth_24: number = xlrg_mnth_23*(1+infl);
//create array of costs for each year
const mnth_23: number[] = [sml_mnth_23, med_mnth_23, lrg_mnth_23, xlrg_mnth_23];
const mnth_24: number[] = [sml_mnth_24, med_mnth_24, lrg_mnth_24, xlrg_mnth_24];

//initialise variables, allowing for tariff increase to be changed in future
const trfinc: number = 0.13;
const lw_trf_23: number = 3.508;
const lw_trf_24: number = lw_trf_23*(1+trfinc);
const hi_trf_23: number = 4.2656;
const hi_trf_24: number = hi_trf_23*(1+trfinc);

//initialise average daily production variables
const sml_prd: number = 10;
const sml_prdadj: number = 12;
const med_prd: number = 14;
const med_prdadj: number = 16;
const lrg_prd: number = 20;
const lrg_prdadj: number = 28;
const xtra_prd: number = 30;
const xtra_prdadj: number = 40;

//function to determine GoSolr cost for user, based on year
function size_from_elec(user_elec: number,year_costs: number[]): number{
    if (user_elec <= 1500) {
        return year_costs[0];
    } else if (user_elec <= 3000) {
        return year_costs[1];
    } else if (user_elec <= 5000) {
        return year_costs[2];
    } else {
        return year_costs[3];
    }
}

//function to determine GoSolr size
function cost_from_elec(user_elec: number): string {
    if (user_elec <= 1500) {
        return "Small";
    } else if (user_elec <= 3000) {
        return "Medium";
    } else if (user_elec <= 5000) {
        return "Large";
    } else {
        return "Extra Large";
    }
}

function user_consumption(user_elec: number): number {
    if (user_elec > (lw_trf_23*600)) {
        return (user_elec-lw_trf_23*600)/hi_trf_23;
    } else {
        return user_elec/lw_trf_23;
    }
}

//initialise average daily production variables
//let sml_prd: number = 10;
//let sml_prdadj: number = 12;
//let med_prd: number = 14;
//let med_prdadj: number = 16;
//let lrg_prd: number = 20;
//let lrg_prdadj: number = 28;
//let xtra_prd: number = 30;
//let xtra_prdadj: number = 40;

//function to work out expected daily output based on size, unadjusted
function exp_dly_unadj(user_size: string, user_cons: number,): number {
    if (user_size == "Small") {
        if ((user_cons/30) >= sml_prd) {
            return sml_prd;
        } else {
        return sml_prd;
        }
    }
    else if (user_size == "Medium") {
        return med_prd;
        }
    else if (user_size == "Large") {
        return lrg_prd;
        }
    else {
        return xtra_prd;
        }
}
//function to work out expected daily output based on size, adjusted
function exp_dly_adj(user_size: string, user_cons: number,): number {
    if (user_size == "Small") {
        if (((user_cons/30)*0.85) >= sml_prdadj) {
            return sml_prdadj;
        } else {
        return sml_prdadj;
        }
    }
    else if (user_size == "Medium") {
        return med_prdadj;
        }
    else if (user_size == "Large") {
        return lrg_prdadj;
        }
    else {
        return xtra_prdadj;
        }
}

function savings(exp_mnth: number, mnth_cons: number, mnth_cost_lw: number, mnth_cost_hi: number): number {
    if (mnth_cons<600) {
        return exp_mnth*mnth_cost_lw;
    }
    else if ((mnth_cons-exp_mnth)>599) {
        return exp_mnth*mnth_cost_hi;
    }
    else {
        return (mnth_cons-600)*mnth_cost_hi+(600-(mnth_cons-exp_mnth))*mnth_cost_lw;
    }
}



