const binominal = (n,m) => {
    try {
        let b_over;
        let b_under;
        let b_under2;
        let i;//under
        let j;//under2
        let k;//over
        if (n>=m && m>=0) {
            for (b_over=1, b_under=1, b_under2=1, i=m, j=n-i, k=1; k<=n; i--,j--,k++) {
                b_over*=k;
                if (i>0) {
                    b_under*=i;
                }
                if(j>0){
                    b_under2*=j;
                }   
            }
            let b = b_over;
            b/=b_under;
            b/=b_under2;
            return b;
        }else{
            throw new Error('Parameters are not valid');
        }
    } catch (error) {
        console.error(error);
    }
}

console.log(binominal(7,3));

const polynomial = (n,m,x) => {
    let i;
    let p;
    let q;
    try {
        for (p=q=i=1; i<=m; i++) {
            q*=-x/n;
            p+=binominal(m,i)*binominal(m+i,i)*q;
            x-=1.;
            n--;
        }
        return p;
    } catch (error) {
        console.error(error);
    }
}

const Q = (n,m,x) => {
    let i;
    let q;
    try{
        for(q=i=0;i<=n;i++){
            q+=polynomial(n,m,x[i])*polynomial(n,m,x[i]);
        }
        return q;
    } catch (error) {
        console.error(error);
    }
}

const Z = (n,m,x,y) => {
    let i;
    let z;
    try{
        for(z=i=0;i<=n;i++){
            z+=y[i]*polynomial(n,m,x[i]);
        }
        return z;
    } catch (error) {
        console.error(error);
    }
}

const Main = () => {
    let x=[0.,1.,2.,3.,4];
    let y=[0.00,0.06,0.20,0.60,0.90];
    let c=[];
    let i;
    let n=x.length/(x.length-1);
    console.log("orthogonal polynomial example\n");
    for(i=0;i<=2;i++){
        c[i]=Z(n,i,x,y)/Q(n,i,x);
        console.log("c[%i]\n",i,c[i]);
    }

    for(i=0;i<=n;i++){
        console.log("x\ty\tp\n",x[i],y[i],c[0]*polynomial(n,0,x[i])+c[1]*polynomial(n,1,x[i])+c[2]*polynomial(n,2,x[i]));
    }
};

Main();