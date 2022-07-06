import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { Metaplex } from "../../Metaplex";
import { Operation, OperationHandler, Signer } from "../../types";
import { TransactionBuilder } from "../../utils";
declare const Key: "PrintNewEditionOperation";
export declare const printNewEditionOperation: import("../../types").OperationConstructor<PrintNewEditionOperation, "PrintNewEditionOperation", PrintNewEditionInput, PrintNewEditionOutput>;
export declare type PrintNewEditionOperation = Operation<typeof Key, PrintNewEditionInput, PrintNewEditionOutput>;
export declare type PrintNewEditionInput = PrintNewEditionSharedInput & PrintNewEditionViaInput;
export declare type PrintNewEditionSharedInput = {
    originalMint: PublicKey;
    newMint?: Signer;
    newMintAuthority?: Signer;
    newUpdateAuthority?: PublicKey;
    newOwner?: PublicKey;
    newFreezeAuthority?: PublicKey;
    payer?: Signer;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
export declare type PrintNewEditionViaInput = {
    via?: 'token';
    originalTokenAccountOwner?: Signer;
    originalTokenAccount?: PublicKey;
} | {
    via: 'vault';
    vaultAuthority: Signer;
    safetyDepositStore: PublicKey;
    safetyDepositBox: PublicKey;
    vault: PublicKey;
    tokenVaultProgram?: PublicKey;
};
export declare type PrintNewEditionOutput = {
    mint: Signer;
    metadata: PublicKey;
    edition: PublicKey;
    associatedToken: PublicKey;
    transactionId: string;
};
export declare const printNewEditionOperationHandler: OperationHandler<PrintNewEditionOperation>;
declare type PrintNewEditionBuilderSharedParams = {
    edition: number | BN;
    newMint: Signer;
    newMetadata: PublicKey;
    newEdition: PublicKey;
    newMintAuthority: Signer;
    newUpdateAuthority: PublicKey;
    newOwner: PublicKey;
    newFreezeAuthority?: PublicKey;
    payer: Signer;
    originalMetadata: PublicKey;
    originalEdition: PublicKey;
    originalEditionMarkPda: PublicKey;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    createMintAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenAccountInstructionKey?: string;
    createTokenAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
    printNewEditionInstructionKey?: string;
};
export declare type PrintNewEditionBuilderParams = PrintNewEditionBuilderSharedParams & ({
    via: 'token';
    originalTokenAccountOwner: Signer;
    originalTokenAccount: PublicKey;
} | {
    via: 'vault';
    vaultAuthority: Signer;
    safetyDepositStore: PublicKey;
    safetyDepositBox: PublicKey;
    vault: PublicKey;
    tokenVaultProgram?: PublicKey;
});
export declare type PrintNewEditionBuilderContext = {
    tokenAddress: PublicKey;
};
export declare const printNewEditionBuilder: (metaplex: Metaplex, params: PrintNewEditionBuilderParams) => Promise<TransactionBuilder<PrintNewEditionBuilderContext>>;
export {};
